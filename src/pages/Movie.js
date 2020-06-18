import React, { useCallback, useState, useMemo } from 'react';
import {
  Image, View, useWindowDimensions, StatusBar, Text,
} from 'react-native';

import axios from 'axios';
import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';
import useDidMount from '../hooks/useDidMount';
import Cover from '../components/Cover';
import { getImageUrl } from '../helpers/url-helper';

const BACKDROP_ASPECT_RATIO = 16 / 9;
const LINEAR_GRADIENT_COLORS = ['#14151A00', '#14151A'];

const Movie = ({ route }) => {
  const movie = route.params?.movie;

  const [movieDetails, setMovieDetails] = useState(movie);

  const { width } = useWindowDimensions();

  const requestDetails = useCallback(async () => {
    try {
      const { data } = await axios.get(`/medias/movie/${movie.id}`, {
        params: {
          language: 'pt-BR',
        },
      });
      setMovieDetails(data);
    } catch (ex) {
      console.warn(ex);
    }
  }, []);

  useDidMount(() => {
    requestDetails();
  }, []);

  const backdropSource = useMemo(
    () => ({
      uri: getImageUrl({ size: 'w780', path: movieDetails.backdrop_path }),
    }),
    [movieDetails.backdrop_path],
  );

  const backdropStyles = useMemo(
    () => ({
      width,
      height: width / BACKDROP_ASPECT_RATIO,
      opacity: 0.8,
    }),
    [width],
  );

  const linearGradientStyles = useMemo(() => ({
    width,
    position: 'absolute',
    bottom: 0,
    height: 120,
  }), [width]);

  return (
    <View>
      <StatusBar backgroundColor="#00000088" />
      <View>

        <Image source={backdropSource} style={backdropStyles} />
        <LinearGradient
          colors={LINEAR_GRADIENT_COLORS}
          style={linearGradientStyles}
        />
      </View>
      <View style={{
        marginTop: -100,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
      >
        <Cover
          posterPath={movieDetails.poster_path}
          side="w500"
        />
        <View />
        <View style={{ flex: 1, marginLeft: 16 }}>

          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} numberOfLines={3}>
            {movieDetails.title}
          </Text>
          <Text style={{ color: '#ffffff44', fontSize: 16 }} numberOfLines={3}>
            {moment(movieDetails.release_date).format('DD/MM/YYYY')}
            {' '}
            -
            {' '}
            {movieDetails.runtime || '-'}
            min
          </Text>
        </View>

      </View>
    </View>
  );
};

export default Movie;
