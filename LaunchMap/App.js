
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Linking,
} from 'react-native';



const App: () => Node = () => {
  const [latitude, setLatitude] = useState(0);
  const [longtitude, setLongtitude] = useState(0);

  const launchMap = () => {
    const location = `${latitude},${longtitude}`
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
  }


  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Lauch Map App
        </Text>
      </View>
      <ScrollView style={{ margin: 20 }}>
        <View>
          <Text style={styles.layerText}>
            Give latitude:
          </Text>
          <TextInput
            placeholder='Write latitude here...'
            style={styles.inputs}
            onChangeText={text => setLatitude(text)}
            keyboardType='numeric' />
          <Text style={styles.layerText}>
            Give longtitude:
          </Text>
          <TextInput
            placeholder='Write longtitude here...'
            style={styles.inputs}
            onChangeText={text => setLongtitude(text)}
            keyboardType='numeric' />
        </View>
        <TouchableOpacity style={styles.button} onPress={launchMap}>
          <Text style={{ color: '#617143' }}>
            Launch a map
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    marginBottom: 22,
    backgroundColor: '#EDE9D5'

  },
  headerText: {
    textAlign: 'center',
    padding: 25,
    color: '#617143',
    fontFamily: 'bold',
    fontSize: 25
  },
  inputs: {
    borderRadius: 15,
    borderWidth: 1
  }
  , layerText: {
    margin: 5,
    marginTop: 50,
    fontFamily: 'bold',
    fontSize: 20,
    color: '#617143'

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: 150,
    backgroundColor: '#EDE9D5',
    marginTop: 50,
    borderColor: '#617143'
  }
})
