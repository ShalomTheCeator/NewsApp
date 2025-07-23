import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { fetchNews } from '../services/apiService';
import NewsItem from '../components/NewsItem';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';

export default function HomeScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('general');

  useEffect(() => {
    loadNews();
  }, [category]);

  const loadNews = async () => {
    try {
      const articles = await fetchNews(category);
      setNews(articles);
    } catch (error) {
      setNews([]);
    }
  };

  const filteredNews = news.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryTabs selected={category} onSelect={setCategory} />
      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <NewsItem
            title={item.title}
            content={item.description}
            image={item.urlToImage}
            onPress={() => navigation.navigate('ArticleDetail', { article: item })}
          />
        )}
        ListEmptyComponent={<Text>No articles found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});