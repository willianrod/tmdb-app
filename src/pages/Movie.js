import React, {
  useCallback, useState, useMemo, memo,
} from 'react';
import {
  Image, View, useWindowDimensions, StatusBar, Text,
  StyleSheet,
} from 'react-native';

import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import useDidMount from '../hooks/useDidMount';
import Cover from '../components/Cover';
import HorizontalMovieCoverList from '../components/HorizontalMovieCoverList';
import { getImageUrl } from '../helpers/url-helper';
import colors from '../values/colors';

const styles = StyleSheet.create({
  header: {
    marginTop: -100,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  movieTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateAndTime: {
    color: '#ffffff66',
  },
  rating: {
    color: colors.primary,
    fontSize: 20,
  },
  ragingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voters: {
    marginLeft: 8,
    color: colors.textSecondary,
  },
  body: {
    padding: 16,
  },
  bodyTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  bodyText: {
    color: colors.textSecondary,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 132,
    paddingHorizontal: 16,
  },
  profileAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  profileAvatarContainer: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditName: {
    marginTop: 16,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  creditCharacterName: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

const BACKDROP_ASPECT_RATIO = 16 / 9;
const LINEAR_GRADIENT_COLORS = ['#14151A00', '#14151A'];

const KEY_EXTRACTOR = (item) => String(item.id);

const Movie = ({ route }) => {
  const movie = route.params?.movie;

  const [movieDetails, setMovieDetails] = useState(movie);
  const [moviewCredits, setMovieCredits] = useState(null);

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

  const requestCredits = useCallback(async () => {
    try {
      const { data } = await axios.get(`/medias/movie/${movie.id}/credits`, {
        params: {
          language: 'pt-BR',
        },
      });
      setMovieCredits(data);
    } catch (ex) {
      console.warn(ex);
    }
  }, []);

  const requestRelated = useCallback(async () => {
    try {
      const { data } = await axios.get(`/medias/movie/${movie.id}/recommendations`, {
        params: {
          language: 'pt-BR',
        },
      });
      return data;
    } catch (ex) {
      console.warn(ex);
      return null;
    }
  }, []);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.profileContainer}>
      <View
        style={styles.profileAvatarContainer}
      >
        <Icon name="account" size={64} color={colors.disabledText} />
        <Image
          source={{ uri: getImageUrl({ path: item.profile_path, size: 'w185' }) }}
          style={styles.profileAvatar}
        />
      </View>
      <Text style={styles.creditName}>{item.name}</Text>
      <Text style={styles.creditCharacterName}>{item.character}</Text>
    </View>
  ), []);

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

  useDidMount(() => {
    requestDetails();
    requestCredits();
  });

  return (
    <ScrollView>
      <StatusBar backgroundColor="#00000044" />
      <View>
        <Image source={backdropSource} style={backdropStyles} />
        <LinearGradient
          colors={LINEAR_GRADIENT_COLORS}
          style={linearGradientStyles}
        />
      </View>
      <View style={styles.header}>
        <Cover
          posterPath={movieDetails.poster_path}
          side="w500"
        />
        <View />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle} numberOfLines={3}>
            {movieDetails.title}
          </Text>
          <Text style={styles.dateAndTime} numberOfLines={3}>
            {moment(movieDetails.release_date).format('DD/MM/YYYY')}
            {' '}
            -
            {' '}
            {movieDetails.runtime || '-'}
            min
          </Text>
          <View style={styles.ragingContainer}>
            <Text style={styles.rating}>
              <Icon name="star" size={32} color={colors.primary} />
            </Text>
            <Text style={styles.rating}>
              {movieDetails.vote_average}
            </Text>
            <Text style={styles.voters}>
              {movieDetails.vote_count}
              {' '}
              votos
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyTitle}>
          Sinopse
        </Text>
        <Text style={styles.bodyText}>
          {movieDetails.overview}
        </Text>

        <Text style={styles.bodyTitle}>
          Creditos
        </Text>
      </View>
      <FlatList
        data={moviewCredits?.cast}
        renderItem={renderItem}
        keyExtractor={KEY_EXTRACTOR}
        horizontal
      />

      <HorizontalMovieCoverList
        title="Relacionados"
        description="Filmes parecidos com este"
        requestDataSource={requestRelated}
      />
    </ScrollView>
  );
};

export default memo(Movie);
