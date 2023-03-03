import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';
import PlayTrailer from './PlayTrailer';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MoviesList"
          component={MovieListScreen}
          options={{ title: 'MovieList' }} >
        </Stack.Screen>

        <Stack.Screen
          name='MovieDetails'
          component={MovieDetailScreen}
          options={{ title: 'MovieDetails' }}>
        </Stack.Screen>
        <Stack.Screen
          name='PlayTrailer'
          component={PlayTrailer}
          options={{ title: 'Trailer' }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
