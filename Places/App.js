
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import type { Node } from 'react';
import { Header } from 'react-native-elements';
import Dialog from 'react-native-dialog'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';

const App: () => Node = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [cities, setCities] = useState([])
  const [cityName, setCityName] = useState('')
  const [notes, setNotes] = useState('')
  const [region, setRegion] = useState({
    latitude: 64.5,
    longitude: 25.7482,
    latitudeDelta: 12,
    longitudeDelta: 10,
  })

  const openDialog = () => {
    setModalVisible(true);
  }
  const closeDialog = () => {
    setModalVisible(false);
  }

  const addCity = async () => {
    try {
      const url = 'https://nominatim.openstreetmap.org/search?q=' + cityName + '&format=json&limit=1';
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const latLng = { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
        setCities([...cities, { id: Math.random(), city: cityName, notes: notes, coordinates: latLng }]);
        setModalVisible(false);
      } else {
        alert('City not found');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while fetching geocoding data');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header
          centerComponent={{ text: "MyPlaces", style: { color: '#2f2e2e', fontSize: 20, fontWeight: 'bold' } }}
          rightComponent={{ icon: "delete", onPress: () => setCities([]) }} //pressing this icon it will delete all markers on the map 
          statusBarProps={{
            barStyle: "light-content"
          }}
          backgroundColor='#E5D1FA'
        />
      </View>

      <View style={styles.mapPlace}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          onRegionChangeComplete={region => setRegion(region)} // this will set user able to zoom and move map.
        >
          {cities.map(city => (

            <Marker
              key={city.id}
              coordinate={city.coordinates}
              title={city.city}
              description={city.notes} />
          ))}
        </MapView>
      </View>

      <TouchableOpacity style={styles.addingButton} onPress={() => openDialog()}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>


      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new MyPlace</Dialog.Title>

        <View style={styles.dialogPlacement}>
          <Dialog.Description style={styles.dialogText}>City</Dialog.Description>
          <Dialog.Input
            style={styles.dialogInput}
            onChangeText={text => setCityName(text)}
            placeholder='City name here...'
            keyboardType='email-address'
            autoCapitalize='sentences' />
        </View>

        <View style={styles.dialogPlacement}>
          <Dialog.Description style={styles.dialogText}>Text</Dialog.Description>
          <Dialog.Input
            style={styles.dialogInput}
            onChangeText={text => setNotes(text)}
            placeholder='Add your own notes here...'
            multiline={true}
            autoCapitalize='sentences'
          />
        </View>

        <View style={styles.dialogButtons}>
          <Button onPress={() => closeDialog()}
            title='Cancel'
            color='#E5D1FA' />
          <Button
            onPress={() => addCity(cityName, notes)}
            title='Add'
            color='#E5D1FA' />
        </View>

      </Dialog.Container>
    </SafeAreaView >

  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapPlace: {
    flex: 1
  },
  container: {
    flex: 1
  },
  addingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5D1FA',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f2e2e'
  },
  dialogPlacement: {
  },
  dialogText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9e9e9e'
  },
  dialogInput: {


  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  }

})

export default App;