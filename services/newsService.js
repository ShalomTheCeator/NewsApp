// services/newsService.js
const API_KEY = "134aed049a9d4274834364e14dbc19ff";
const BASE_URL = "https://newsapi.org/v2";

export async function fetchNews(category = "general") {
  try {
    const url = `${BASE_URL}/top-headlines?country=us&category=${category.toLowerCase()}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "ok") {
      return data.articles;
    } else {
      console.error("News API error:", data);
      return [];
    }
  } catch (error) {
    console.error("Fetch news error:", error);
    return [];
  }
}
