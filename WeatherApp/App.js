
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { SafeAreaView, View, Text, ScrollView, Button, StyleSheet, Alert } from 'react-native';
import { Header, Input, Card, Image } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/FontAwesome'
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => Node = () => {

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [cities]);


  const [modalVisible, setModalVisible] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  const openDialog = () => {
    setModalVisible(true);
  }

  const addCity = () => {
    setCities([...cities, { id: Math.random(), name: cityName }])
    setModalVisible(false);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const deleteCity = (deleteCity) => {
    let filteredArray = cities.filter(city => city.id !== deleteCity);
    setCities(filteredArray);
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities))
    }
    catch (e) {
      console.log("Cities saving error!")
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if (value !== null) {
        setCities(JSON.parse(value));
      }
    }
    catch (e) {
      console.log("Cities loading error.")
    }
  }


  const WeatherForecast = (params) => {
    const city = params.city;
    const API_Key = '65e166570d6837c891d76384560e2eb7';
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q='

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {                            //this will set date on title of each card
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hours = new Date().getHours();
      var min = new Date().getMinutes();
      setCurrentDate(
        date + '/' + month + '/' + year
        + ' ' + hours + ':' + min
      );

    }, [])



    const [{ data, loading, error }, refetch] = useAxios(
      URL + city.name + '&appid=' + API_Key + '&units=metric'
    )
    if (loading) return (
      <Card>
        <Card.Title>Loading...</Card.Title>
      </Card>
    )
    if (error) return (
      <Card>
        <Card.Title>Error loading weather forecast!</Card.Title>
      </Card>
    )
    const refreshForecast = () => {
      refetch();
    }
    let imagURL = 'https://openweathermap.org/img/wn/'
    let icon = data.weather[0].icon;
    let end = '@2x.png'
    let image = imagURL + icon + end;

    const deleteCity = () => {
      params.deleteCity(city.id);
    }


    console.log(data);
    return (
      <Card>
        <View style={styles.direction}>
          <View style={{ flex: 1 }}>
            <Card.Title>{city.name} : {currentDate}</Card.Title>
            <Text>Weather: {data.weather[0].description} </Text>
            <Text>Temperature: {data.main.temp} °C</Text>
            <Text>Feels like: {data.main.feels_like} °C</Text>
            <Text style={{ marginBottom: 15 }}>Wind: {data.wind.speed} m/s</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: image }} style={styles.img} />
            <View style={styles.buttonContainer}>
              <Button title='Refresh' onPress={refreshForecast} style={styles.button} />
              <Button title='Delete' onPress={deleteCity} style={styles.button} />
            </View>
          </View>
        </View>
      </Card>
    ); 
  }
  return (
    <SafeAreaView>
      <Header
        centerComponent={{ text: 'Weather App', style: { color: 'white' } }}
        rightComponent={{ icon: 'add', color: 'white', onPress: openDialog }}
      ></Header>
      <ScrollView>
        {cities.map(city => (
          <WeatherForecast key={city.id} city={city} deleteCity={deleteCity} />
        ))}
      </ScrollView>
      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <View>
          <Input
            onChangeText={text => setCityName(text)}
            placeholder='Type cityname here'
          />
        </View>
        <Dialog.Button label='Cancel' onPress={cancelCity} />
        <Dialog.Button label='Add' onPress={addCity} />
      </Dialog.Container>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',

  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: '45%',
    marginBottom: 5,
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    widht: '100%'
  }
})


export default App;
