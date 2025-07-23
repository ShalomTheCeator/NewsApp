// components/CommentSection.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function CommentSection({ articleId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const commentsRef = collection(db, 'articles', articleId, 'comments');
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    });
    return unsubscribe;
  }, []);

  const postComment = async () => {
    if (!comment.trim()) return;

    await addDoc(collection(db, 'articles', articleId, 'comments'), {
      text: comment,
      userEmail: user?.email || 'Anonymous',
      createdAt: serverTimestamp(),
    });
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.comment}><Text style={styles.email}>{item.userEmail}: </Text>{item.text}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No comments yet.</Text>}
      />
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
        style={styles.input}
      />
      <Button title="Post" onPress={postComment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  header: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginVertical: 10 },
  comment: { paddingVertical: 5 },
  email: { fontWeight: 'bold' },
  empty: { color: '#777', fontStyle: 'italic' },
});
