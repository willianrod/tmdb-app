import React, {
  useMemo, useEffect, useRef, memo,
} from 'react';

import {
  View, Image, Text, StyleSheet,
  Animated,
} from 'react-native';
import Easing from 'react-native/Libraries/Animated/src/Easing';
import { getImageUrl } from '../helpers/url-helper';
import Touchable from './Touchable';

const styles = StyleSheet.create({
  indexIndicator: {
    padding: 2,
    width: 25,
    textAlign: 'center',
    position: 'absolute',
    top: 8,
    left: 0,
    backgroundColor: '#ffffffaa',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  indexText: {
    textAlign: 'center',
    fontSize: 12,
  },
  coverContainer: {
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

const Cover = memo(({
  index, showIndex, size = 'w500',
  onPress, posterPath, width = 140,
}) => {
  const imageSource = useMemo(() => ({
    uri: getImageUrl({ path: posterPath, size }),
  }), []);

  const height = useMemo(() => (width / (2 / 3)), [width]);

  const coverStyles = useMemo(() => ({
    width,
    height,
  }), [width, height]);

  const coverContainerStyles = useMemo(() => ({
    ...styles.coverContainer,
    ...coverStyles,
  }), [coverStyles]);

  return useMemo(() => (
    <Touchable
      onPress={onPress}
    >
      <View style={coverContainerStyles}>
        <Image source={imageSource} style={coverStyles} />

        {showIndex ? (
          <View style={styles.indexIndicator}>

            <Text style={styles.indexText}>
              {index + 1}
            </Text>
          </View>
        ) : null}
      </View>
    </Touchable>
  ), []);
});

Cover.Placeholder = memo(({ width = 140 }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const height = useMemo(() => (width / (2 / 3)), [width]);

  const placeHolderStyles = useMemo(() => ({
    width,
    height,
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    opacity: fadeAnim,
  }), [width, height]);

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

  return (
    <Animated.View style={placeHolderStyles} useNativeDriver={false} />
  );
});

export default Cover;
