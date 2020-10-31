import React, { memo } from 'react';
import {
  Text, View, Image, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getImageUrl } from '../helpers/url-helper';
import colors from '../values/colors';
import MediaTypeTag from './MediaTypeTag';

const AVATAR_WIDTH = 100;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileAvatar: {
    height: AVATAR_WIDTH,
    width: AVATAR_WIDTH,
    borderRadius: 16,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  profileAvatarContainer: {
    height: AVATAR_WIDTH,
    width: AVATAR_WIDTH,
    borderRadius: 16,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditName: {
    color: colors.textPrimary,
  },
  creditCharacterName: {
    color: colors.textSecondary,
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

const MediaPerson = ({ person }) => (
  <View>
    <View style={styles.profileContainer}>
      <View
        style={styles.profileAvatarContainer}
      >
        <Icon name="account" size={64} color={colors.disabledText} />
        <Image
          source={{ uri: getImageUrl({ path: person.profile_path, size: 'w185' }) }}
          style={styles.profileAvatar}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.creditName} numberOfLines={2}>{person.name}</Text>
        <View style={styles.about}>
          <MediaTypeTag mediaType="person" />
        </View>
      </View>
    </View>
    <Text />
  </View>
);

export default memo(MediaPerson);
