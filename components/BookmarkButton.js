import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

export default function BookmarkButton({ article }) {
  const [bookmarked, setBookmarked] = useState(false);
  const articleId = encodeURIComponent(article.url);

  useEffect(() => {
    const checkBookmark = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, 'users', user.uid, 'bookmarks', articleId);
      const docSnap = await getDoc(docRef);
      setBookmarked(docSnap.exists());
    };
    checkBookmark();
  }, []);

  const toggleBookmark = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid, 'bookmarks', articleId);

    try {
      if (bookmarked) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          title: article.title,
          url: article.url,
          urlToImage: article.urlToImage || '',
          publishedAt: article.publishedAt,
          description: article.description || '',
        });
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return (
    <TouchableOpacity onPress={toggleBookmark} style={styles.button}>
      <Text style={styles.text}>{bookmarked ? 'Remove Bookmark' : 'Bookmark'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: '#2196F3',
  },
}); 