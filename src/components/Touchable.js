import React from 'react';

import { Platform, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const Touchable = ({ onPress, children }) => {
  if (!onPress) {
    return children;
  }

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      useForeground
    >
      {children}
    </TouchableNativeFeedback>
  );
};

export default Touchable;
