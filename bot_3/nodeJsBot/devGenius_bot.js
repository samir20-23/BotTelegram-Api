require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const telegramToken = process.env.TELEGRAM_TOKEN;
const geminiApiKey = process.env.GEMINI_API_KEY;

const bot = new TelegramBot(telegramToken, { polling: true });

async function getGeminiResponse(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(url, body, { headers });
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "No response from Gemini.";
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return "Sorry, I am unable to generate a response at the moment.";
  }
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  const reply = await getGeminiResponse(userInput);

  //start the new code
  const MAX_LENGTH = 4096;
  if (reply.length <= MAX_LENGTH) {
    bot.sendMessage(chatId, reply);
  } else {
    for (let i = 0; i < reply.length; i += MAX_LENGTH) {
      bot.sendMessage(chatId, reply.substring(i, i + MAX_LENGTH));
    }
  }
  //end the new code
});
