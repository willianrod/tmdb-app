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
    alignItems: 'center',
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

const MediaTV = ({ tvShow }) => {
  const navigation = useNavigation();

  const handleNavigate = useCallback(() => {
    navigation.push('TVShow', { item: tvShow });
  }, [navigation, tvShow]);

  return (
    <Touchable onPress={handleNavigate}>
      <View>
        <View style={styles.profileContainer}>
          <Cover posterPath={tvShow.poster_path} width={100} />

          <View style={styles.container}>
            <Text style={styles.creditName} numberOfLines={2}>{tvShow.name}</Text>
            <View style={styles.about}>
              <MediaTypeTag mediaType="tv" />
              <Text style={styles.subtitle}>
                {' '}
                -
                {' '}
                {
                  tvShow.first_air_date
                    ? moment(tvShow.first_air_date).format('MM/DD/YYYY')
                    : null
                }
              </Text>
            </View>
          </View>
        </View>
        <Text />
      </View>
    </Touchable>
  );
};

export default memo(MediaTV);
