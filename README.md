# 📰 News App

A full-featured, mobile-first news application built using **React Native (Expo)**. This app delivers personalized news updates, allows user interaction through comments and reactions, and integrates with Firebase, NewsAPI, and OpenAI for a rich, intelligent experience.

---

## 🎯 Project Overview

The goal of this project is to create a modern, scalable, and intuitive mobile news platform where users can:

- Read trending and categorized news in real-time
- Bookmark articles and access them later
- Use AI-generated summaries to quickly grasp news highlights
- React and comment on articles like a social platform
- Switch between light/dark themes for better readability
- Receive push notifications for breaking news
- Access personalized profiles and an admin dashboard

This app is optimized for **Expo Go** to enable rapid development and cross-platform deployment.

---

## ✨ Features

### 🔐 Authentication
- Firebase Auth for user signup/login/logout
- Session persistence via `@react-native-async-storage/async-storage`
- Protected routes using `onAuthStateChanged`

### 📰 News Feed
- NewsAPI integration for real-time news
- Categorized filters: Business, Technology, Sports, Health, etc.
- Search bar for keyword-based filtering

### 💡 AI Summarization
- Each article can be summarized using OpenAI’s GPT
- Summaries are cached and stored in Firestore for performance

### 🔖 Bookmarking
- Users can bookmark articles and access them anytime
- Stored in Firebase Firestore under user-specific collections

### 💬 Comments & Reactions
- Post comments and emoji-style reactions per article
- Firestore-based real-time interaction
- Like, heart, or laugh at articles

### 🔔 Push Notifications
- Powered by Expo Notifications
- Triggered when breaking news is published

### 🌓 Dark Mode
- Automatic based on system settings
- Theming managed through `useColorScheme()` and custom themes

### 📢 Text-to-Speech
- Articles can be read aloud using `expo-speech`
- Accessible for visually impaired users

### 📊 Admin Panel (Planned)
- Dashboard to manage users, flagged comments, and push content

---

## 🛠 Tech Stack

| Area         | Tech Used                            |
|--------------|--------------------------------------|
| Framework    | React Native (Expo SDK)              |
| Auth & DB    | Firebase (Auth, Firestore)           |
| News Source  | NewsAPI.org                          |
| AI Summary   | OpenAI API (GPT-3.5/4)               |
| Storage      | AsyncStorage                         |
| UI Library   | React Native core components         |
| Navigation   | React Navigation (Stack Navigator)   |
| Notifications| Expo Notifications                   |
| Voice        | Expo Speech                          |
| Icons        | Expo Vector Icons                    |

---


## 🧑‍💻 Contributing
# Contributions are welcome!


## 📄 License
# This project is open-source and available under the MIT License.

## 🙋 Contact
# Made with ❤️ by Shalom
# GitHub: @ShalomTheCreator
# Twitter: @lucasmteo499
# Email: shalompremiumdomains@gmail.com
"""
