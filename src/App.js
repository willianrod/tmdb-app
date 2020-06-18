import React from 'react';

import {
  Provider as ReduxProvider,
} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';

import { store } from './redux';
import Start from './pages/Start';
import Movie from './pages/Movie';

const APP_THEME = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#14151A',
    card: '#1C1D24',
    text: '#ffffff',
    border: 'rgb(199, 199, 204)',
  },
};

const Stack = createStackNavigator();

const MoviewStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Movie" component={Movie} />
  </Stack.Navigator>
);

const App = () => (
  <ReduxProvider store={store}>
    <NavigationContainer theme={APP_THEME}>
      {/*
      <View style={{ flex: 1, backgroundColor: '#14151A' }}>
        <Home />
      </View> */}
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={MoviewStack} />
      </Stack.Navigator>
    </NavigationContainer>
  </ReduxProvider>
);

export default App;
