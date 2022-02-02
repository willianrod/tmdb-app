import React, { useCallback } from 'react';
import {
  Text, StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import connect from 'react-redux/lib/connect/connect';
import thunks from '../redux/thunks';
import useDidMount from '../hooks/useDidMount';

const Start = ({ getCategories, navigation }) => {
  const { t, i18n } = useTranslation();
  const requestCategories = useCallback(async () => {
    try {
      await getCategories();
      SplashScreen.hide();
      StatusBar.setBarStyle('light-content');
      navigation.replace('Home');
    } catch (ex) {
      console.warn(ex);
    }
  }, []);

  useDidMount(() => {
    requestCategories();
  });

  return <Text>{t('Loading')}...</Text>;
};

const mapDispatchToProps = ({
  getCategories: thunks.getCategories,
});

export default connect(null, mapDispatchToProps)(Start);
