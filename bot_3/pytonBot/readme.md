Here's the updated README with the changes you requested:

---

# devGenius_bot

This is a Telegram bot that allows users to search for anime information using the Jikan API. When a user sends the name of an anime to the bot, it replies with information such as the title, image, synopsis, release date, airing status, producers, genres, and video link (if available).

## Requirements

1. **Python 3.8 or higher**.
2. **`python-telegram-bot` library** to interact with the Telegram API.
3. **`requests` library** to make HTTP requests to the Jikan API.

## Installation

### 1. Install Python
Make sure you have Python 3.8 or higher installed on your machine. You can download Python from the [official site](https://www.python.org/downloads/).

### 2. Set up a Virtual Environment
It's recommended to create a virtual environment for your project. You can do this by running the following command:

```bash
python -m venv venv
```

Then, activate the virtual environment:

- On Windows:

  ```bash
  venv\Scripts\activate
  ```

- On macOS/Linux:

  ```bash
  source venv/bin/activate
  ```

### 3. Install Dependencies

After activating the virtual environment, install the required libraries by running:

```bash
pip install -r requirements.txt
```

Alternatively, you can manually install the dependencies with:

```bash
pip install python-telegram-bot requests
```

### 4. Set Your Telegram Bot Token

You need to replace `"YOUR_TOKEN"` in the `main()` function with your actual bot token. You can obtain your token by creating a bot through [BotFather on Telegram](https://core.telegram.org/bots#botfather).

### 5. Run the Bot

To start the bot, run the following command:

```bash
python devGenius_bot.py
```

The bot will start listening for messages, and you can interact with it by sending the name of an anime.

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

Make sure to rename your bot script to `devGenius_bot.py` for consistency. Let me know if you need further changes!