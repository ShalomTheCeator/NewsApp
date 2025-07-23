import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';

import { summarizeArticle } from '../services/aiService';
import BookmarkButton from '../components/BookmarkButton';
import PlayAudioButton from '../components/PlayAudioButton';
import CommentSection from '../components/CommentSection';
import ReactionBar from '../components/ReactionBar';

import { lightTheme, darkTheme } from '../theme';

export default function ArticleDetailScreen({ route }) {
  const { article } = route.params;
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const articleId = encodeURIComponent(article.url);

  const handleSummarize = async () => {
    setLoading(true);
    const result = await summarizeArticle(
      article.content || article.description || article.title
    );
    setSummary(result);
    setLoading(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}

      <Text style={[styles.title, { color: theme.text }]}>{article.title}</Text>
      <Text style={[styles.author, { color: theme.text }]}>
        By {article.author || 'Unknown'}
      </Text>
      <Text style={[styles.content, { color: theme.text }]}>
        {article.content || article.description || 'No content available.'}
      </Text>

      {/* 🔊 Text-to-Speech */}
      <PlayAudioButton text={article.content || article.description || article.title} />

      {/* 🔖 Bookmark */}
      <BookmarkButton article={article} />

      {/* 🤖 AI Summarize */}
      <View style={styles.button}>
        <Button
          title="Summarize Article"
          onPress={handleSummarize}
          disabled={loading}
          color={theme.button}
        />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {summary && (
        <View style={[styles.summaryBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.text }]}>AI Summary</Text>
          <Text style={{ color: theme.text }}>{summary}</Text>
        </View>
      )}

      {/* 👍👎❤️ Reactions */}
      <ReactionBar articleId={articleId} />

      {/* 💬 Comments */}
      <CommentSection articleId={articleId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 5,
  },
  author: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  summaryBox: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});
