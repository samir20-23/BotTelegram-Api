from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from apscheduler.util import get_localzone
import pytz
from apscheduler.schedulers.asyncio import AsyncIOScheduler

timezone = pytz.utc  # Set the timezone

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hello! I am your bot!")

def main():
    # إنشاء التطبيق
    application = Application.builder().token("7736808800:AAGIZCfyT7TDrtXQu54uf0Gjg96iDOazRc4").build()

    # إضافة أوامر
    application.add_handler(CommandHandler("start", start))

    # Initialize the scheduler and set the timezone
    scheduler = AsyncIOScheduler(timezone=timezone)
    scheduler.start()

    # تشغيل البوت
    application.run_polling()

if __name__ == "__main__":
    main()
