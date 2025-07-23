// screens/SavedNewsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import NewsItem from '../components/NewsItem';

export default function SavedNewsScreen({ navigation }) {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDocs(collection(db, 'users', user.uid, 'bookmarks'));
      const articles = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setSavedArticles(articles);
    };

    fetchBookmarks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Articles</Text>
      <FlatList
        data={savedArticles}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <NewsItem
            title={item.title}
            content={item.description}
            image={item.urlToImage}
            onPress={() => navigation.navigate('ArticleDetail', { article: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
