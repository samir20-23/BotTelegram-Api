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
