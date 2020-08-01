import React from 'react';

import {
  Provider as ReduxProvider,
} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';

import colors from './values/colors';
import { store } from './redux';
import Start from './pages/Start';
import Movie from './pages/Movie';

const APP_THEME = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.backgroundLight,
    text: colors.textPrimary,
    border: colors.textSecondary,
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
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={MoviewStack} />
      </Stack.Navigator>
    </NavigationContainer>
  </ReduxProvider>
);

export default App;
