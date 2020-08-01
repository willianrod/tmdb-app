import React, { useCallback } from 'react';
import {
  Text,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import connect from 'react-redux/lib/connect/connect';
import thunks from '../redux/thunks';
import useDidMount from '../hooks/useDidMount';

const Start = ({ getCategories, navigation }) => {
  const requestCategories = useCallback(async () => {
    try {
      await getCategories();
      SplashScreen.hide();
      navigation.replace('Home');
    } catch (ex) {
      console.warn(ex);
    }
  }, []);

  useDidMount(() => {
    requestCategories();
  });

  return <Text>Loading...</Text>;
};

const mapDispatchToProps = ({
  getCategories: thunks.getCategories,
});

export default connect(null, mapDispatchToProps)(Start);
