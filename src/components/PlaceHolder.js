import React, {
  useMemo, useEffect, useRef,
} from 'react';

import { Animated, Easing } from 'react-native';

const PlaceHolder = ({ style }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 800,
            easing: Easing.back(),
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          fadeAnim,
          {
            toValue: 0.5,
            duration: 800,
            easing: Easing.back(),
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 800,
            easing: Easing.back(),
            useNativeDriver: true,
          },
        ),
      ]),
    ).start();
  }, []);

  const placeholderStyle = useMemo(() => ({
    ...style,
    opacity: fadeAnim,
  }), [style]);

  return (
    <Animated.View style={placeholderStyle} />
  );
};

export default PlaceHolder;
