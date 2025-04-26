require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const telegramToken = process.env.TELEGRAM_TOKEN;
const geminiApiKey = process.env.GEMINI_API_KEY;

const bot = new TelegramBot(telegramToken, { polling: true });
const messagesFile = path.join(__dirname, 'messages.json');

const messageCounts = new Map();
const BLOCK_TIME = 20 * 60 * 1000;
const MAX_MESSAGES = 15;

// Greetings & random replies
const greetings = ['hi', 'hello', 'welcome', 'ss', 'cc', 'ola', 'salam', 'slm', 'wsp', 'you', 'yo', 'hey', 'hi there'];
const welcomeReplies = [
  'Hi, welcome to DevGeniusAi 🤖✨',
  'Hello! DevGeniusAi at your service 🌟',
  'Hey there! You’re chatting with DevGeniusAi 🚀',
  'Salam! DevGeniusAi says hello 👋',
  'Ola! DevGeniusAi ready to help you 😊'
];

function saveMessage(chatId, message, username, phoneNumber) {
  const newMessage = {
    name: username || "_-_-_",
    phone_number: phoneNumber || "_-_-_-",
    chat_id: chatId,
    message,
    timestamp: new Date().toISOString()
  };
  let data = [];
  if (fs.existsSync(messagesFile)) {
    try {
      data = JSON.parse(fs.readFileSync(messagesFile, 'utf8')) || [];
    } catch {
      data = [];
    }
  }
  data.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2), 'utf8');
}

async function getGeminiResponse(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
  const body = {
    system_instruction: {
      parts: [{ 
        text: "You are DevGeniusAi. Do NOT include any introductory boiler-plate. Answer the user’s query directly."
      }]
    },
    contents: [{ parts: [{ text: prompt }] }]
  };
  const headers = { 'Content-Type': 'application/json' };

  try {
    const res = await axios.post(url, body, { headers });
    return res.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (err) {
    console.error("DevGeniusAi API error:", err);
    return "Sorry, I am unable to generate a response at the moment.";
  }
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text || "";
  const username = msg.from?.username || "Unknown";
  const phoneNumber = msg.contact?.phone_number || "Not provided";

  if (!messageCounts.has(chatId)) {
    messageCounts.set(chatId, { count: 0, blockTime: 0 });
  }
  const userStats = messageCounts.get(chatId);

  // Block check
  if (userStats.blockTime > Date.now()) return;

  // Rate-limit
  if (userStats.count >= MAX_MESSAGES) {
    bot.sendMessage(chatId, "safi gayrha 😁😂😂");
    userStats.blockTime = Date.now() + BLOCK_TIME;
    userStats.count = 0;
    return;
  }

  // Greetings
  if (greetings.includes(userInput.toLowerCase())) {
    const reply = welcomeReplies[Math.floor(Math.random() * welcomeReplies.length)];
    bot.sendMessage(chatId, reply, { parse_mode: 'Markdown' });
    return;
  }

  // Log & count
  saveMessage(chatId, userInput, username, phoneNumber);
  userStats.count++;

  // Get AI reply
  let reply = await getGeminiResponse(userInput);

  // Replace any variant of “gemini”
  reply = reply.replace(/\b(?:gimini|ai gimini|google gimin|gemini)\b/gi, 'DevGenius_Ai');

  // Dynamic replacements table
  const replacements = {
    "by Google": "crafted with 💡 by [Samir Aoulad Amar](https://www.instagram.com/samir_devgenius), is the boss",
    "Google AI": "DevGenius_Ai Brain",
    "Made by Google": "brought to you by [Samir Aoulad Amar](https://www.instagram.com/samir_devgenius)",
    "gimini google ": "DevGenius_Ai Assistant",
    "google gimini": "DevGenius_Ai Assistant",
    "AI model": "DevGenius_Ai model",
    "machine learning": "DevGenius_Ai magic",
    "neural network": "DevGenius_Ai neural core",
    "laravel": "[laravel](https://skillicons.dev/icons?i=laravel)",
    "html": "[html](https://skillicons.dev/icons?i=html)",
    "css": "[css](https://skillicons.dev/icons?i=css)",
    "express": "[express](https://skillicons.dev/icons?i=express)",
    "mysql": "[mysql](https://skillicons.dev/icons?i=mysql)",
    "vscode": "[vscode](https://skillicons.dev/icons?i=vscode)",
    "ubuntu": "[ubuntu](https://skillicons.dev/icons?i=ubuntu)",
    "github": "[github](https://skillicons.dev/icons?i=github)",
    "vue": "[vue](https://skillicons.dev/icons?i=vue)",
    "figma": "[figma](https://skillicons.dev/icons?i=figma)",
    "tailwind": "[tailwind](https://skillicons.dev/icons?i=tailwind)",
    "adonis": "[adonis](https://skillicons.dev/icons?i=adonis)",
    "javascript": "[javascript](https://skillicons.dev/icons?i=javascript)",
    "angular": "[angular](https://skillicons.dev/icons?i=angular)",
    "linux": "[linux](https://skillicons.dev/icons?i=linux)",
    "md": "[md](https://skillicons.dev/icons?i=md)",
    "react": "[react](https://skillicons.dev/icons?i=react)",
    "python": "[python](https://skillicons.dev/icons?i=python)",
    "bun": "[bun](https://skillicons.dev/icons?i=bun)",
    "npm": "[npm](https://skillicons.dev/icons?i=npm)",
    "git": "[git](https://skillicons.dev/icons?i=git)",
    "alpinejs": "[alpinejs](https://skillicons.dev/icons?i=alpinejs)",
    "php": "[php](https://skillicons.dev/icons?i=php)",
    "bootstrap": "[bootstrap](https://skillicons.dev/icons?i=bootstrap)",
    "androidstudio": "[androidstudio](https://skillicons.dev/icons?i=androidstudio)",
    "kotlin": "[kotlin](https://skillicons.dev/icons?i=kotlin)",
    "arduino": "[arduino](https://skillicons.dev/icons?i=arduino)",
    "kali": "[kali](https://skillicons.dev/icons?i=kali)",
    "nodejs": "[nodejs](https://skillicons.dev/icons?i=nodejs)",
    "ux": "[UX](https://skillicons.dev/icons?i=ux)",
    "ui": "[UI](https://skillicons.dev/icons?i=ux)"
  };
  for (const [key, value] of Object.entries(replacements)) {
    reply = reply.replace(new RegExp(key, 'gi'), value);
  }

  // Send in chunks with Markdown
  const MAX_LEN = 4096;
  if (reply.length <= MAX_LEN) {
    bot.sendMessage(chatId, reply, { parse_mode: 'Markdown' });
  } else {
    for (let i = 0; i < reply.length; i += MAX_LEN) {
      bot.sendMessage(chatId, reply.substring(i, i + MAX_LEN), { parse_mode: 'Markdown' });
    }
  }
});
