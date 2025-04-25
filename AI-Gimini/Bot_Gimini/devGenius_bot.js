require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const telegramToken = process.env.TELEGRAM_TOKEN;
const geminiApiKey = process.env.GEMINI_API_KEY;

const bot = new TelegramBot(telegramToken, { polling: true });

// File to save messages
const messagesFile = path.join(__dirname, 'messages.json');

// Track user messages and block time
const messageCounts = new Map();
const BLOCK_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds
const MAX_MESSAGES = 15; // Maximum messages before block

// Function to save messages to the file
function saveMessage(chatId, message, username, phoneNumber) {
  const newMessage = {
    name: username || "Unknown",
    phone_number: phoneNumber || "Not provided",
    chat_id: chatId,
    message: message,
    timestamp: new Date().toISOString()
  };

  let data = [];
  
  if (fs.existsSync(messagesFile)) {
    const fileContent = fs.readFileSync(messagesFile, 'utf8');
    try {
      data = JSON.parse(fileContent) || [];
    } catch (e) {
      console.error("Error parsing messages.json", e);
      data = [];  // Initialize empty array if parse fails
    }
  }

  data.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2), 'utf8');
}

// Function to get response from Gemini API
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

// Handling incoming messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;
  const username = msg.from?.username || "Unknown";
  const phoneNumber = msg.contact?.phone_number || "Not provided";

  // Track user message count
  if (!messageCounts.has(chatId)) {
    messageCounts.set(chatId, { count: 0, blockTime: 0 });
  }

  const userStats = messageCounts.get(chatId);

  // If user is blocked, do not process their message
  if (userStats.blockTime > Date.now()) {
    return;
  }

  // If user has sent more than MAX_MESSAGES, block them and send the message
  if (userStats.count >= MAX_MESSAGES) {
    bot.sendMessage(chatId, "safi gayrha 😁😂😂");
    userStats.blockTime = Date.now() + BLOCK_TIME; // Block user for 20 minutes
    userStats.count = 0; // Reset message count after block
    return;
  }

  // Save the message and increment the count
  saveMessage(chatId, userInput, username, phoneNumber);
  userStats.count += 1;

  const reply = await getGeminiResponse(userInput);

  // Handle large responses
  const MAX_LENGTH = 4096;
  if (reply.length <= MAX_LENGTH) {
    bot.sendMessage(chatId, reply);
  } else {
    for (let i = 0; i < reply.length; i += MAX_LENGTH) {
      bot.sendMessage(chatId, reply.substring(i, i + MAX_LENGTH));
    }
  }
});
