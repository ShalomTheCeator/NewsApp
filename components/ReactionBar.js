// components/ReactionBar.js
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function ReactionBar({ articleId }) {
  const [reactions, setReactions] = useState({ likes: 0, dislikes: 0, hearts: 0 });

  useEffect(() => {
    const fetchReactions = async () => {
      const docRef = doc(db, 'articles', articleId, 'reactions');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setReactions(snap.data());
      }
    };
    fetchReactions();
  }, []);

  const handleReact = async (type) => {
    const docRef = doc(db, 'articles', articleId, 'reactions');
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      await setDoc(docRef, { likes: 0, dislikes: 0, hearts: 0 });
    }

    await updateDoc(docRef, {
      [type]: (reactions[type] || 0) + 1,
    });

    setReactions(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleReact('likes')} style={styles.button}>
        <Text>👍 {reactions.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleReact('dislikes')} style={styles.button}>
        <Text>👎 {reactions.dislikes}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleReact('hearts')} style={styles.button}>
        <Text>❤️ {reactions.hearts}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  button: { padding: 10, backgroundColor: '#eee', borderRadius: 6 },
});
