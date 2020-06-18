import React, { useMemo, useEffect, useRef } from 'react';

import {
  View, Image, Text, StyleSheet,
  Animated,
} from 'react-native';
import Easing from 'react-native/Libraries/Animated/src/Easing';
import { useNavigation } from '@react-navigation/native';
import { getImageUrl } from '../helpers/url-helper';
import Touchable from './Touchable';

const COVER_WIDTH = 140;
const COVER_HEIGHT = 140 / (2 / 3);

const styles = StyleSheet.create({
  movieCover: {
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
  },
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
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

const Cover = ({
  index, showIndex, size = 'w500',
  onPress, posterPath,
}) => {
  const imageSource = useMemo(() => ({
    uri: getImageUrl({ path: posterPath, size }),
  }), []);

  return (
    <Touchable
      onPress={onPress}
    >
      <View style={styles.coverContainer}>
        <Image source={imageSource} style={styles.movieCover} />

        {showIndex ? (
          <View style={styles.indexIndicator}>

            <Text style={styles.indexText}>
              {index + 1}
            </Text>
          </View>
        ) : null}
      </View>
    </Touchable>
  );
};

Cover.Placeholder = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const placeHolderStyles = useMemo(() => ({
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    opacity: fadeAnim,
  }), []);

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
};

export default Cover;
