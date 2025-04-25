// public/script.js

const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const messagesDiv = document.getElementById('messages');

const chatId = 'userChatId';
const username = 'username';
const phoneNumber = '123456789';

const STORAGE_KEY = 'chatMessages';
const MAX_LOCAL = 5;
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// load messages from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const now = Date.now();
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // filter out older than 24h
    .filter(m => now - new Date(m.timestamp).getTime() < EXPIRY_MS)
    // take last MAX_LOCAL
    .slice(-MAX_LOCAL);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  saved.forEach(m => displayMessage(m.text, m.sender));
});

// save one message to localStorage
function persistMessage(sender, text) {
  const now = Date.now();
  let arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    .filter(m => now - new Date(m.timestamp).getTime() < EXPIRY_MS);

  arr.push({ sender, text, timestamp: new Date().toISOString() });
  // keep only last MAX_LOCAL
  arr = arr.slice(-MAX_LOCAL);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  displayMessage(message, 'user');
  persistMessage('user', message);

  userInput.value = '';
  userInput.disabled = true;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, chatId, username, phoneNumber })
    });
    const data = await res.json();

    (data.reply || []).forEach(text => {
      displayMessage(text, 'bot');
      persistMessage('bot', text);
    });
  } catch (err) {
    console.error(err);
  }

  userInput.disabled = false;
  userInput.focus();
}

function displayMessage(message, sender) {
  const div = document.createElement('div');
  div.classList.add('message', `${sender}-message`);
  div.textContent = message;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

// xxxxxxxxxx
document.querySelector('.theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// To add a message to the chat
function addMessage(text, isUser) {
  const messagesDiv = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  
  // Message content
  messageDiv.innerHTML = `
    ${text}
    <div class="message-timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    <div class="message-avatar">${isUser ? 'U' : '<div style="width:20px;height:20px;background:#5664d2;border-radius:50%;"></div>'}</div>
  `;
  
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  // Show scroll to top button if needed
  checkScroll();
}

// Show/hide scroll to top button based on scroll position
function checkScroll() {
  const messagesDiv = document.getElementById('messages');
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  if (messagesDiv.scrollTop > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

// Add scroll event listener
document.getElementById('messages').addEventListener('scroll', checkScroll);

// Scroll to top button functionality
document.querySelector('.scroll-top').addEventListener('click', function() {
  document.getElementById('messages').scrollTop = 0;
});