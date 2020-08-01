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

const Home = () => {
  const [trendingDay, setTrendingDay] = useState(null);

  const flatlistRef = useRef(null);

  const requestTrendingDay = useCallback(async () => {
    try {
      const { data } = await axios.get('/medias/trending/movie/day', {
        params: {
          language: 'pt-BR',
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
      const { data } = await axios.get('/medias/trending/movie/week', {
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

  const requestDiscover = useCallback(async () => {
    try {
      const { data } = await axios.get('/medias/discover/movie', {
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

  const requestTopRated = useCallback(async () => {
    try {
      const { data } = await axios.get('/medias/movie/top_rated', {
        params: {
          language: 'pt-BR',
          region: 'BR',
        },
      });

      return data;
    } catch (ex) {
      console.warn(ex);
      return null;
    }
  }, []);

  const renderItem = useCallback(({ item }) => <SliderItem item={item} />, []);

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
        title="Melhores da semana"
        description="Veja quais são os melhores filmes da semana"
        showIndex
        requestDataSource={requestTrendingWeek}
      />
      <HorizontalMovieCoverList
        title="Descubra"
        description="Descubra ótimos filmes para assistir"
        requestDataSource={requestDiscover}
      />
      <HorizontalMovieCoverList
        title="Mais votados"
        description="Veja quais são os filmes mais bem votados no Brasil"
        requestDataSource={requestTopRated}
      />
    </ScrollView>
  );
};

export default memo(Home);
