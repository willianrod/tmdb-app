import React, { memo, useCallback } from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';

import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import colors from '../values/colors';
import Cover from './Cover';
import MediaTypeTag from './MediaTypeTag';
import Touchable from './Touchable';

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  creditName: {
    color: colors.textPrimary,
  },
  subtitle: {
    color: '#878787',
  },
  container: {
    marginLeft: 16,
    flex: 1,
  },
  about: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const MediaMovie = ({ movie }) => {
  const navigation = useNavigation();

  const handleNavigate = useCallback(() => {
    navigation.push('Movie', { item: movie });
  }, [navigation, movie]);

  return (
    <Touchable onPress={handleNavigate}>
      <View>
        <View style={styles.profileContainer}>
          <Cover posterPath={movie.poster_path} width={100} />
          <View style={styles.container}>
            <Text style={styles.creditName} numberOfLines={2}>{movie.title}</Text>
            <View style={styles.about}>
              <MediaTypeTag mediaType="movie" />
              <Text style={styles.subtitle}>
                {' '}
                -
                {' '}
                {moment(movie.release_date).format('MM/DD/YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <Text />
      </View>
    </Touchable>
  );
};

export default memo(MediaMovie);
