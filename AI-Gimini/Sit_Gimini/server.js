require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const messagesFile = path.join(__dirname, 'messages.json');
const BLOCK_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds
const MAX_MESSAGES = 20; // Maximum messages before block

// Track user messages and block time
const messageCounts = new Map();

// Function to save messages to the file
function saveMessage(email, message) {
  const newMessage = {
    email: email || "Unknown",
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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
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

app.post('/api/chat', async (req, res) => {
  const { message, email } = req.body;

  // Track user message count
  if (!messageCounts.has(email)) {
    messageCounts.set(email, { count: 0, blockTime: 0 });
  }

  const userStats = messageCounts.get(email);

  // If user is blocked, do not process their message
  if (userStats.blockTime > Date.now()) {
    return res.status(403).json({ reply: "You are temporarily blocked. Try again later." });
  }

  // If user has sent more than MAX_MESSAGES, block them and send the message
  if (userStats.count >= MAX_MESSAGES) {
    userStats.blockTime = Date.now() + BLOCK_TIME; // Block user for 20 minutes
    userStats.count = 0; // Reset message count after block
    return res.status(200).json({ reply: "safi gayrha 😁😂😂" });
  }

  // Save the message and increment the count
  saveMessage(email, message);
  userStats.count += 1;

  const reply = await getGeminiResponse(message);

  // Handle large responses
  const MAX_LENGTH = 4096;
  let replies = [];
  if (reply.length <= MAX_LENGTH) {
    replies.push(reply);
  } else {
    for (let i = 0; i < reply.length; i += MAX_LENGTH) {
      replies.push(reply.substring(i, i + MAX_LENGTH));
    }
  }

  res.json({ reply: replies });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
