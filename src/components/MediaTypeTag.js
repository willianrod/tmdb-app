import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MEDIA_TYPE = {
  movie: 'Movie',
  tv: 'TV Show',
  person: 'Person',
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#878787',
    paddingHorizontal: 6,
    paddingBottom: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: 11,
  },
});

const MediaTypeTag = ({ mediaType }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{MEDIA_TYPE[mediaType]}</Text>
  </View>
);

export default memo(MediaTypeTag);
