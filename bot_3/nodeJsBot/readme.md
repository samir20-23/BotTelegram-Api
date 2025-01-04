Here’s a `devGenius_bot.js` Node.js version of the Telegram bot and the updated README with instructions for setting up and running the bot in Node.js.

---

## devGenius_bot.js (Node.js Version)

```javascript
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace with your actual token from BotFather
const token = 'YOUR_TOKEN';

// Create a new Telegram bot instance
const bot = new TelegramBot(token, { polling: true });

// Function to fetch anime data from the Jikan API
async function fetchAnimeData(query) {
  const url = `https://api.jikan.moe/v4/anime?q=${query}`;

  try {
    const response = await axios.get(url);
    const anime = response.data.data[0];

    if (anime) {
      const title = anime.title;
      const imgUrl = anime.images.jpg.large_image_url;
      const synopsis = anime.synopsis;
      const releaseDate = anime.aired ? anime.aired.string : 'Release date not available';
      const airingStatus = anime.airing ? 'Airing' : 'Finished';
      const producers = anime.producers.map(producer => producer.name).join(', ');
      const genres = anime.genres.map(genre => genre.name).join(', ');
      const trailerUrl = anime.trailer ? anime.trailer.embed_url : null;

      return { title, imgUrl, synopsis, releaseDate, airingStatus, producers, genres, trailerUrl };
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome! Send me the name of an anime, and I will show you information about it.");
});

// Handle user messages (anime search)
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const searchValue = msg.text.trim().toLowerCase();

  if (searchValue === '/start') return;

  if (!searchValue) {
    bot.sendMessage(chatId, "Please provide an anime name.");
    return;
  }

  const animeData = await fetchAnimeData(searchValue);

  if (animeData) {
    bot.sendMessage(chatId, `Anime: ${animeData.title}\n\n${animeData.synopsis.slice(0, 200)}...`);
    bot.sendPhoto(chatId, animeData.imgUrl);
    bot.sendMessage(chatId, `Release Date: ${animeData.releaseDate}`);
    bot.sendMessage(chatId, `Airing Status: ${animeData.airingStatus}`);
    bot.sendMessage(chatId, `Producers: ${animeData.producers}`);
    bot.sendMessage(chatId, `Genres: ${animeData.genres}`);

    if (animeData.trailerUrl) {
      bot.sendMessage(chatId, `Trailer: ${animeData.trailerUrl}`);
      bot.sendVideo(chatId, animeData.trailerUrl);
    } else {
      bot.sendMessage(chatId, "No trailer available.");
    }
  } else {
    bot.sendMessage(chatId, "No anime found with that name.");
  }
});
```

---

## Updated README for devGenius_bot (Node.js Version)

---

# devGenius_bot (Node.js Version)

This is a Telegram bot built using Node.js that allows users to search for anime information using the Jikan API. When a user sends the name of an anime to the bot, it replies with details such as the title, image, synopsis, release date, airing status, producers, genres, and video link (if available).

## Requirements

1. **Node.js** (version 12.x or higher)
2. **`node-telegram-bot-api`**: Telegram bot API wrapper for Node.js.
3. **`axios`**: HTTP client for making requests to the Jikan API.

## Installation

### 1. Install Node.js

Ensure you have **Node.js** installed. You can download it from the [official website](https://nodejs.org/en/download/).

### 2. Set Up the Project

1. Create a new directory for your project and navigate to it:

   ```bash
   mkdir devGenius_bot
   cd devGenius_bot
   ```

2. Initialize a new Node.js project:

   ```bash
   npm init -y
   ```

3. Install the required dependencies:

   ```bash
   npm install node-telegram-bot-api axios
   ```

### 3. Set Your Telegram Bot Token

- Go to [BotFather](https://core.telegram.org/bots#botfather) on Telegram and create a new bot to get your bot token.
- Replace `YOUR_TOKEN` in the `devGenius_bot.js` file with your actual bot token.

### 4. Run the Bot

To start the bot, run the following command in your terminal:

```bash
node devGenius_bot.js
```

Your bot will start listening for messages, and you can interact with it by sending the name of an anime.

## How to Use

1. **Start the Bot**: Send `/start` to the bot to get a welcome message.
2. **Search for Anime**: Send the name of any anime to the bot. The bot will reply with information about the anime including:
   - Title
   - Image
   - Synopsis (truncated to 200 characters)
   - Release Date
   - Airing Status (Airing or Finished)
   - Producers
   - Genres
   - Trailer (if available)

## Error Handling

If the bot encounters any issues, it will notify you with a message indicating that something went wrong.

---

With this Node.js version of your bot, you can now run it on your server or local environment. Let me know if you need further adjustments or help!