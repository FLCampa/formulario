// External Libraries
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Switch,
  Button,
  Keyboard,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

function App() {
  // States
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(0);
  const [accountLimit, setAccountLimit] = useState(0);
  const [isStudent, setIsStudent] = useState();
  const [formData, setFormData] = useState();

  const genders = [{name: 'Masculino'}, {name: 'Feminino'}, {name: 'Outro'}];

  const renderPickerItens = genders.map((gender, key) => (
    <Picker.Item
      style={styles.pickerItem}
      key={key}
      value={key}
      label={gender.name}
    />
  ));

  // Fuctions
  function selectedGender() {
    switch (gender) {
      case 0:
        return 'Masculino';
      case 1:
        return 'Feminino';
      case 2:
        return 'Outro';
    }
  }

  function showRegisteredDataOnScreen() {
    if (name === '' || age === '')
      return alert('Todos os campos devem estar preenchidos!');

    Keyboard.dismiss();

    setFormData({
      name: name,
      age: age,
      gender: selectedGender(),
      accountLimit: accountLimit,
      isStudent: isStudent ? 'Sim' : 'Não',
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        value={age}
        onChangeText={text => setAge(text)}
      />

      <Text style={styles.text}>Sexo</Text>
      <Picker
        style={styles.picker}
        itemStyle={{height: 44}}
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
        {renderPickerItens}
      </Picker>

      <Text style={styles.text}>Seu limite: {accountLimit.toFixed(0)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10000}
        value={accountLimit}
        onValueChange={value => setAccountLimit(value)}
        minimumTrackTintColor="blue"
      />

      <View style={styles.switch}>
        <Text style={styles.text}>Estudante</Text>
        <Switch
          value={isStudent}
          onValueChange={value => setIsStudent(value)}
          thumbColor={isStudent ? 'blue' : 'whitesmoke'}
        />
      </View>

      <Button
        style={styles.button}
        title="Abrir conta"
        onPress={showRegisteredDataOnScreen}
      />

      {formData && (
        <View style={styles.formData}>
          <Text style={styles.title}>FormData</Text>
          <Text style={styles.formItem}>Nome: {formData.name}</Text>
          <Text style={styles.formItem}>Idade: {formData.age}</Text>
          <Text style={styles.formItem}>Sexo: {formData.gender}</Text>
          <Text style={styles.formItem}>
            Limite: {formData.accountLimit.toFixed(0)}
          </Text>
          <Text style={styles.formItem}>Estudante: {formData.isStudent}</Text>
        </View>
      )}
    </View>
  );
}

// Stylization
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  picker: {
    marginBottom: 15,
    maxHeight: 20,
  },
  pickerItem: {
    fontSize: 18,
  },
  slider: {
    marginBottom: 15,
  },
  switch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    padding: 20,
    marginBottom: 20,
  },
  formData: {
    display: 'flex',
    marginTop: 50,
  },
  formItem: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default App;
