// components/CategoryTabs.js
import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

const categories = ['All', 'Business', 'Technology', 'Sports', 'Health'];

export default function CategoryTabs({ selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          style={[styles.tab, selected === cat && styles.selected]}
        >
          <Text style={[styles.text, selected === cat && styles.textSelected]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#333',
  },
  text: {
    color: '#000',
  },
  textSelected: {
    color: '#fff',
  },
});
