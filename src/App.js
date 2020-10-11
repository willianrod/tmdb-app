import React from 'react';

import {
  Provider as ReduxProvider,
} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Movies from './pages/Movies';
import TVShows from './pages/TVShows';

import colors from './values/colors';
import { store } from './redux';
import Start from './pages/Start';
import Movie from './pages/Movie';
import TVShow from './pages/TVShow';

const MovieTabIcon = ({ color, size }) => (
  <MaterialCommunityIcon name="movie" size={size} color={color} />
);

const TVTabIcon = ({ color, size }) => (
  <MaterialIcon name="tv" size={size} color={color} />
);

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
const Tab = createBottomTabNavigator();

var MovieStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Movies" component={Movies} />
    <Stack.Screen name="Movie" component={Movie} />
  </Stack.Navigator>
);

var TVShowsStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="TVShows" component={TVShows} />
    <Stack.Screen name="TVShow" component={TVShow} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      options={{ tabBarIcon: MovieTabIcon, title: 'Movies' }}
      name="MoviesTab"
      component={MovieStack}
    />
    <Tab.Screen
      options={{ tabBarIcon: TVTabIcon, title: 'TV Shows' }}
      name="TVShowsTab"
      component={TVShowsStack}
    />
  </Tab.Navigator>
);

const App = () => (
  <ReduxProvider store={store}>
    <NavigationContainer theme={APP_THEME}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  </ReduxProvider>
);

export default App;
