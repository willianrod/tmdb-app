import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Touchable from './Touchable';

const { OS } = Platform;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff33',
    borderRadius: 40,
    height: 42,
    width: 42,
    paddingTop: OS === 'android' ? 0 : 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <Touchable onPress={navigation.goBack}>
      <View style={styles.container}>
        <Icon name="arrow-left" color="white" size={24} />
      </View>
    </Touchable>
  );
};

export default GoBackButton;
