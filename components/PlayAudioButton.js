// components/PlayAudioButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

export default function PlayAudioButton({ text }) {
  const handleSpeak = () => {
    if (text) {
      Speech.speak(text, {
        language: 'en',
        pitch: 1,
        rate: 1,
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleSpeak} style={styles.button}>
      <Text style={styles.text}>🔊 Listen to Article</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0077cc',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});
