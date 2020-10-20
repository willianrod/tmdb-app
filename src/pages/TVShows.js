import React, {
  useCallback, useState, useRef, memo,
} from 'react';
import {
  View, FlatList, StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

import axios from 'axios';

import SliderItem from '../components/SliderItem';
import HorizontalMovieCoverList from '../components/HorizontalMovieCoverList';
import useDidMount from '../hooks/useDidMount';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff55',
    marginLeft: 16,
    marginBottom: 8,
  },
  horizontalSpacing: {
    width: 8,
  },
  horizontalCoverList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  flatlist: {
    marginBottom: 16,
  },
});

const KEY_EXTRACTOR = (item) => String(item.id);

const TVShows = () => {
  const [trendingDay, setTrendingDay] = useState(null);

  const flatlistRef = useRef(null);

  const requestTrendingDay = useCallback(async () => {
    try {
      const { data } = await axios.get('/medias/trending/tv/day', {
        params: {
          language: 'en-US',//
        },
      });

      const newData = {
        ...data,
        results: data.results.filter((item) => Boolean(item.backdrop_path)),
      };

      setTrendingDay(newData);
    } catch (ex) {
      console.warn(ex);
    }
  }, []);

  const requestTrendingWeek = useCallback(async () => {
    try {
      const { data } = await axios.get('/medias/trending/tv/week', {
        params: {
          language: 'en-US',//
        },
      });

      return data;
    } catch (ex) {
      console.warn(ex);
      return null;
    }
  }, []);

  const requestDiscover = useCallback(async () => {
    try {
      const { data } = await axios.get('/medias/discover/tv', {
        params: {
          language: 'en-US',//
        },
      });

      return data;
    } catch (ex) {
      console.warn(ex);
      return null;
    }
  }, []);

  const requestTopRated = useCallback(async () => {
    try {
      const { data } = await axios.get('/medias/tv/top_rated', {
        params: {
          language: 'en-US',//
          region: 'BR',
        },
      });

      return data;
    } catch (ex) {
      console.warn(ex);
      return null;
    }
  }, []);

  const renderItem = useCallback(({ item }) => <SliderItem item={item} mediaType="tv" />, []);

  const renderEmptyComponent = () => (
    <View style={styles.placeholderContainer}>
      <SliderItem.Placeholder />
    </View>
  );

  useDidMount(() => {
    requestTrendingDay();
  }, []);

  return (
    <ScrollView>
      <StatusBar backgroundColor="#00000044" translucent />
      <FlatList
        ref={flatlistRef}
        keyExtractor={KEY_EXTRACTOR}
        data={trendingDay?.results}
        horizontal
        renderItem={renderItem}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
        ListEmptyComponent={renderEmptyComponent}
      />
      <HorizontalMovieCoverList
        title="Best of the week"
        description="See which are the best series of the week"
        showIndex
        requestDataSource={requestTrendingWeek}
        mediaType="tv"
      />
      <HorizontalMovieCoverList
        title="Discover"
        description="Descubra ótimas séries para assistir"
        requestDataSource={requestDiscover}
        mediaType="tv"
      />
      <HorizontalMovieCoverList
        title="Top rated"
        description="See which are the most voted series in Brazil"
        requestDataSource={requestTopRated}
        mediaType="tv"
      />
    </ScrollView>
  );
};

export default memo(TVShows);
