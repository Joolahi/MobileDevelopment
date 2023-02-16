import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';
import React, { useState } from 'react'

export default function App() {
  const [number1, setNumber1] = useState('0');
  const [number2, setNumber2] = useState('0');
  const [result, setResult] = useState('0');

  const buttonPressed = (e, calc) => {
    let n1 = parseInt(number1)
    let n2 = parseInt(number2)
    if (isNaN(n1) || isNaN(n2)) {
      setResult('Invalid input')
      return;
    }
    if (calc === '+') setResult(n1 + n2 + "");
    else if (calc === '-') setResult(parseInt(number1) - parseInt(number2) + "");
    else if (calc === '/') setResult(parseInt(number1) / parseInt(number2) + "");
    else if (calc === '*') setResult(parseInt(number1) * parseInt(number2) + "");
    Keyboard.dismiss();
  }



  return (
    <View style={styles.container}>
      <Text style={styles.calculator}>Calculator</Text>
      <StatusBar style="auto" />
      <View style={styles.row}>
        <View style={styles.text}>
          <Text> Number 1: </Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={number1}
            onChangeText={text => setNumber1(text)}
            keyboardType={'numeric'}
            placeholder="0"
            style={{ textAlign: 'center' }}
          ></TextInput>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text> Number 2:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={number2}
            onChangeText={text => setNumber2(text)}
            keyboardType={'numeric'}
            placeholder="0"
            style={{ textAlign: 'center' }}
          ></TextInput>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Button color='#d6c4b0' title=' + ' onPress={(e) => buttonPressed(e, '+')} />
        <Button color='#d6c4b0' title=' - ' onPress={(e) => buttonPressed(e, '-')} />
        <Button color='#d6c4b0' title=' / ' onPress={(e) => buttonPressed(e, '/')} />
        <Button color='#d6c4b0' title=' * ' onPress={(e) => buttonPressed(e, '*')} />
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text> Result: </Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder='0'
            style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'black' }}
            editable={false}
            value={result}
          ></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f0e4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calculator:
  {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d6c4b0'
  },

  row: {
    flexDirection: 'row',
    marginTop: 5,
    fontWeight: 'bold'
  },

  text: {
    borderRadius: 20,
    backgroundColor: '#e2dfd5',
    justifyContent: 'center',
    padding: 10,
    width: 100,
    borderColor: 'black',
    borderWidth: 1
  },

  textInput: {
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1.0,
    width: 100,
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 220
  },

});
