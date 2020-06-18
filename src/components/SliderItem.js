import React, { useMemo } from 'react';
import {
  View, Image, Text, StyleSheet, useWindowDimensions, StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Category from './Category';
import { getImageUrl } from '../helpers/url-helper';
import PlaceHolder from './PlaceHolder';

const styles = StyleSheet.create({
  backdropContainer: {
    position: 'relative',
    alignSelf: 'flex-end',
    margin: 16,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#ffffff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titlePlaceHolder: {
    width: 250,
    height: 18,
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    marginLeft: 16,
    marginBottom: 4,
  },
  categoriesPlaceHolder: {
    width: 180,
    height: 16,
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    marginLeft: 16,
    marginBottom: 4,
  },
});

const BACKDROP_ASPECT_RATIO = 16 / 9;
const LINEAR_GRADIENT_COLORS = ['#14151A00', '#14151A'];

const SliderItem = ({ item }) => {
  const { width } = useWindowDimensions();

  const {
    backdrop_path: backdropPath, title,
    genre_ids: genreIds,
  } = item;

  const blurredImageStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
    width,
  }), [width]);

  const linearGradientStyles = useMemo(() => ({
    width,
    paddingHorizontal: 16,
  }), [width]);

  const containerStyle = useMemo(
    () => ({
      width,
      margin: 0,
      paddingBottom: 0,
      justifyContent: 'space-between',
    }),
    [width],
  );

  const blurredImageSource = useMemo(
    () => ({
      uri: getImageUrl({ size: 'w300', path: backdropPath }),
    }),
    [],
  );

  const backdropSource = useMemo(
    () => ({
      uri: getImageUrl({ size: 'w780', path: backdropPath }),
    }),
    [backdropPath],
  );

  const backdropStyles = useMemo(
    () => ({
      width: width - 30,
      height: width / BACKDROP_ASPECT_RATIO - 32,
      marginTop: StatusBar.currentHeight,
      borderRadius: 4,
    }),
    [width],
  );

  const renderCategories = () => {
    const newGenreIds = [...genreIds];

    return newGenreIds.slice(0, 3).map((id) => (<Category key={id} id={id} />));
  };

  return (
    <View style={containerStyle}>
      <Image
        style={blurredImageStyle}
        source={blurredImageSource}
        blurRadius={3}
      />
      <View style={styles.backdropContainer}>
        <Image source={backdropSource} style={backdropStyles} />
      </View>
      <LinearGradient
        colors={LINEAR_GRADIENT_COLORS}
        style={linearGradientStyles}
      >
        <Text
          style={styles.movieTitle}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={styles.categoryContainer}>
          {renderCategories()}
        </View>
      </LinearGradient>
    </View>
  );
};

SliderItem.Placeholder = () => {
  const { width } = useWindowDimensions();

  const containerStyle = useMemo(
    () => ({
      width,
      margin: 0,
    }),
    [width],
  );

  const placeHolderStyles = useMemo(() => ({
    width: width - 30,
    height: width / BACKDROP_ASPECT_RATIO - 32,
    marginTop: StatusBar.currentHeight + 16,
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    marginHorizontal: 16,
    marginBottom: 24,
  }), [width]);

  return (
    <View style={containerStyle}>
      {/* <View style={styles.backdropContainer}> */}
      <PlaceHolder style={placeHolderStyles} />
      {/* </View> */}
      <PlaceHolder style={styles.titlePlaceHolder} />
      <PlaceHolder style={styles.categoriesPlaceHolder} />
    </View>
  );
};

export default SliderItem;
