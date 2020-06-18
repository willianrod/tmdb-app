import React, { useCallback, useState } from 'react';

import {
  FlatList, Text, StyleSheet, View, Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Cover from './Cover';
import useDidMount from '../hooks/useDidMount';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: '#ffffff55',
    marginBottom: 8,
  },
  horizontalSpacing: {
    width: 8,
  },
  horizontalCoverList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  placeholderContainer: {
    flexDirection: 'row',
  },
});

const KEY_EXTRACTOR = (item) => String(item.id);

const HorizontalSpacing = () => <View style={styles.horizontalSpacing} />;

const MovieCard = ({ item, index, showIndex }) => {
  const navigation = useNavigation();

  const handleMoviePress = () => {
    navigation.navigate('Movie', { movie: item });
  };

  return (
    <Cover
      posterPath={item.poster_path}
      index={index}
      size="w342"
      showIndex={showIndex}
      onPress={handleMoviePress}
    />
  );
};

const HorizontalMovieCoverList = ({
  requestDataSource, showIndex = false, title, description,
}) => {
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);

  const renderCover = useCallback(({ item, index }) => (
    <MovieCard item={item} index={index} showIndex={showIndex} />
  ), []);

  const requestListData = useCallback(async () => {
    setLoading(true);

    const data = await requestDataSource();
    setDataSource(data);

    setLoading(false);
  }, []);

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.placeholderContainer}>
          <Cover.Placeholder />
          <HorizontalSpacing />
          <Cover.Placeholder />
          <HorizontalSpacing />
          <Cover.Placeholder />
        </View>
      );
    }

    return (
      <Text>Nada por aqui</Text>
    );
  };

  useDidMount(() => {
    requestListData();
  }, []);

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
        <Button color="rgb(255, 45, 85)" title="+ Ver mais" />
      </View>
      <FlatList
        data={dataSource?.results}
        horizontal
        keyExtractor={KEY_EXTRACTOR}
        renderItem={renderCover}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HorizontalSpacing}
        contentContainerStyle={styles.horizontalCoverList}
        fadingEdgeLength={80}
        ListEmptyComponent={renderEmptyComponent}
      />
    </>
  );
};

export default HorizontalMovieCoverList;
