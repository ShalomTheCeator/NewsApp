// services/apiService.js
import axios from 'axios';

// 🔐 Replace with your actual NewsAPI key
const API_KEY = '134aed049a9d4274834364e14dbc19ff';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export async function fetchNews(category = 'general') {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        country: 'us',
        category,
        apiKey: API_KEY,
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
