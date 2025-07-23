import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZkWMOMUyxYu7X8ijUpxuJ8M6VUkxD1wg",
  authDomain: "newsapp-8c9de.firebaseapp.com",
  projectId: "newsapp-8c9de",
  storageBucket: "newsapp-8c9de.firebasestorage.app",
  messagingSenderId: "684526296543",
  appId: "1:684526296543:web:3354813c0e51dc0a13b86a",
  measurementId: "G-7JZ89JW05J"
};

const app = initializeApp(firebaseConfig);

// Use AsyncStorage for auth persistence in React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});