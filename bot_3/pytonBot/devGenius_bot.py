import requests
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext

# Function to fetch anime data from Jikan API
def fetch_anime_data(query):
    url = f"https://api.jikan.moe/v4/anime?q={query}"
    response = requests.get(url)
    data = response.json()
    
    if data.get("data"):
        anime = data["data"][0]
        title = anime["title"]
        img_url = anime["images"]["jpg"]["large_image_url"]
        synopsis = anime["synopsis"]
        release_date = anime["aired"].get("string", "Release date not available")
        airing_status = "Airing" if anime["airing"] else "Finished"
        producers = ', '.join([producer["name"] for producer in anime["producers"]])
        genres = ', '.join([genre["name"] for genre in anime["genres"]])
        trailer_url = anime.get("trailer", {}).get("embed_url", None)
        return title, img_url, synopsis, trailer_url, release_date, airing_status, producers, genres
    else:
        return None, None, None, None, None, None, None, None

# Function to handle the /start command
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Welcome! Send me the name of an anime, and I will show you information about it.")

# Function to handle the user's message
async def search_anime(update: Update, context: CallbackContext):
    search_value = update.message.text.strip().lower()
    
    if not search_value:
        await update.message.reply_text("Please provide an anime name.")
        return
    
    title, img_url, synopsis, trailer_url, release_date, airing_status, producers, genres = fetch_anime_data(search_value)
    
    if title and img_url:
        # Send anime name, image, synopsis, release date, airing status, producers, and genres
        await update.message.reply_text(f"Anime: {title}\n\n{synopsis[:200]}...")  # Show first 200 characters of synopsis
        await update.message.reply_photo(photo=img_url)
        await update.message.reply_text(f"Release Date: {release_date}")
        await update.message.reply_text(f"Airing Status: {airing_status}")
        await update.message.reply_text(f"Producers: {producers}")
        await update.message.reply_text(f"Genres: {genres}")
        
        if trailer_url:
            await update.message.reply_text(f"Trailer: {trailer_url}")
            await update.message.reply_text(f"Sending video...")
            # Assuming trailer URL is a YouTube link, send video from the URL
            await update.message.reply_video(video=trailer_url)
        else:
            await update.message.reply_text("No trailer available.")
    else:
        await update.message.reply_text("No anime found with that name.")

# Function to handle errors
async def error(update: Update, context: CallbackContext):
    print(f"Error: {context.error}")
    if update:
        await update.message.reply_text("Sorry, something went wrong. Please try again later.")

def main():
    # Replace 'YOUR_TOKEN' with your actual bot token
    application = Application.builder().token("7736808800:AAGIZCfyT7TDrtXQu54uf0Gjg96iDOazRc4").build()

    # Handle /start command
    application.add_handler(CommandHandler("start", start))
    
    # Handle messages with anime name
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, search_anime))

    # Handle errors
    application.add_error_handler(error)

    # Start the bot
    application.run_polling()

if __name__ == '__main__':
    main()
