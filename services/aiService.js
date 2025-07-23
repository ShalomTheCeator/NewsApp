// services/aiService.js
const openaiApiKey = "<your-openai-api-key-here>";

export async function summarizeArticle(content) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes news articles in a short and clear paragraph.",
          },
          {
            role: "user",
            content: `Summarize this article:\n\n${content}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      console.warn("OpenAI returned no result:", data);
      return "Unable to summarize.";
    }
  } catch (err) {
    console.error("OpenAI API error:", err);
    return "Error summarizing the article.";
  }
}
