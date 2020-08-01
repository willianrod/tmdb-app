import React, { useCallback, useState, useMemo } from 'react';

import {
  FlatList, Text, StyleSheet, View, Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Cover from './Cover';
import useDidMount from '../hooks/useDidMount';
import colors from '../values/colors';

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
});

const KEY_EXTRACTOR = (item) => String(item.id);

const HorizontalSpacing = () => <View style={styles.horizontalSpacing} />;

const MovieCard = ({ item, index, showIndex }) => {
  const navigation = useNavigation();

  const handleMoviePress = () => {
    navigation.push('Movie', { movie: item });
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
  const [loading, setLoading] = useState(true);

  const renderCover = useCallback(({ item, index }) => (
    <MovieCard item={item} index={index} showIndex={showIndex} />
  ), []);

  const requestListData = useCallback(async () => {
    setLoading(true);

    const data = await requestDataSource();
    setDataSource(data);

    setLoading(false);
  }, []);

  const renderEmptyComponent = useMemo(() => {
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
  }, [loading]);

  useDidMount(() => {
    requestListData();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
        <Button color={colors.primary} title="+ Ver mais" />
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
