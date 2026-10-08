# Telegram Bot orqali FC Mobile 25 Veb-Ilovasini (TMA) ishga tushirish
# Kerakli kutubxona: pip install aiogram (yoki python-telegram-bot)

import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

# BotFather'dan olingan bot tokeningizni bu yerga qo'ying:
BOT_TOKEN = "SIZNING_BOT_TOKENINGIZ"

# Vebsaytingiz joylashgan manzil (masalan, GitHub Pages, Vercel yoki Ngrok orqali):
# Masalan: https://sizning-domen.vercel.app yoki ngrok orqali: https://abc.ngrok-free.app
WEBAPP_URL = "https://fc-mobile-online.uz" 

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    # WebApp tugmasi bilan klaviatura
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="⚽ FC Mobile O'yinini O'ynash (Bepul)",
                web_app=WebAppInfo(url=WEBAPP_URL)
            )
        ],
        [
            InlineKeyboardButton(
                text="🎁 Bepul Tangalar Olish",
                callback_data="free_coins"
            )
        ]
    ])
    
    welcome_text = (
        f"Assalomu alaykum, <b>{message.from_user.first_name}</b>!\n\n"
        "🎮 <b>FC MOBILE 25 ONLINE</b> ilovasiga xush kelibsiz!\n\n"
        "🌟 Bu yerda barcha narsa <b>100% BEPUL</b>:\n"
        "• Cheksiz TOTY va Afsonalar paketlari\n"
        "• O'zbekiston milliy terma jamoasi yulduzlari\n"
        "• Interaktiv Penaltilar seriyasi va VS Hujum rejimi\n"
        "• Omad charxpalagi va transfer bozori\n\n"
        "O'yinni boshlash uchun quyidagi tugmani bosing 👇"
    )
    
    await message.answer(welcome_text, parse_mode="HTML", reply_markup=kb)

@dp.callback_query(lambda c: c.data == "free_coins")
async def process_free_coins(callback: types.CallbackQuery):
    await callback.answer("🪙 Sizga 1,000,000 oltin berildi! O'yin ichida bemalol foydalaning.", show_alert=True)

async def main():
    if BOT_TOKEN == "SIZNING_BOT_TOKENINGIZ":
        print("DIQQAT: Iltimos, BOT_TOKEN o'rniga o'zingizning Telegram Bot tokeningizni kiriting!")
    print("Bot ishga tushdi...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Bot to'xtatildi.")
