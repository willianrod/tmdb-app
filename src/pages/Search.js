import React, {
  useCallback, useState, useRef, memo, useMemo, useEffect,
} from 'react';
import {
  View, FlatList, StyleSheet,
  StatusBar,
  Text,
  RefreshControl,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';

import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDebounce from '../hooks/useDebounce';
import MediaPerson from '../components/MediaPerson';
import MediaMovie from '../components/MediaMovie';
import MediaTV from '../components/MediaTV';

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
  flatList: {
    marginBottom: 16,
    // flex: 1,
  },
  placeholderContainer: {
    backgroundColor: '#ffffff22',
  },
  searchBarTextInput: {
    height: 60,
    borderBottomColor: 'gray',
    borderWidth: 1,
    color: 'white',
    paddingHorizontal: 16,
  },
  emptyContainer: {
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    color: 'gray',
  },
  contentContainer: {
    marginVertical: 16,
    paddingBottom: 60,
  },
});

const KEY_EXTRACTOR = (item) => String(item.id);

const Search = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(null);
  const debouncedQuery = useDebounce(query, 1000);
  const [dataSource, setDataSource] = useState(null);

  const flatlistRef = useRef(null);

  const requestSearch = useCallback(async () => {
    if (!debouncedQuery) return;
    setLoading(true);
    try {
      const { data } = await axios.get('/common/search/multi', {
        params: {
          query: debouncedQuery,
          language: 'en-US',
        },
      });

      setDataSource(data);
    } catch (ex) {
      console.warn(ex);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery]);

  const renderItem = useCallback(({ item }) => {
    switch (item.media_type) {
      case 'person':
        return <MediaPerson person={item} />;
      case 'movie':
        return <MediaMovie movie={item} />;
      case 'tv':
        return <MediaTV tvShow={item} />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    requestSearch();
  }, [debouncedQuery]);

  const renderSearchBar = () => (
    <View style={styles.placeholderContainer}>
      <TextInput
        placeholder="Type something to search"
        placeholderTextColor="gray"
        autoFocus
        style={styles.searchBarTextInput}
        onChangeText={setQuery}
        value={query}
      />
    </View>
  );

  const renderEmptySearchResults = useCallback(() => (
    <View style={styles.emptyContainer}>
      <FeatherIcon name="inbox" size={128} color="gray" />
      <Text style={styles.emptyText}>No results found</Text>
    </View>
  ), []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#00000044" translucent />
      {renderSearchBar()}
      <FlatList
        ref={flatlistRef}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={requestSearch} />
        }
        contentContainerStyle={styles.contentContainer}
        keyExtractor={KEY_EXTRACTOR}
        ListEmptyComponent={renderEmptySearchResults}
        data={dataSource?.results}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

export default memo(Search);
