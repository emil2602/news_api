import { nextTick } from 'process';
import { Telegraf, Context } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

interface MyContext extends Context {
  state: {
    code?: string;
  };
  startPayload?: string;
}

const botToken = process.env.TG_BOT_TOKEN;

if (!botToken) {
  throw new Error('Bot token is not defined in environment variables.');
}

const bot = new Telegraf<MyContext>(botToken);



// Middleware для обработки всех сообщений
bot.use(async (ctx, next) => {
  console.log('Full message:', ctx.message);

  return next();
});

//vidoe_note

bot.on('video_note', async (ctx) => {
    console.warn(' =================== DETECTED VIDEO_NOTE ===================');
});

bot.on('voice', async (ctx) => {
    console.warn(' =================== DETECTED VOICE ===================');
});


bot.on('photo', async (ctx) => {
    console.warn(' =================== DETECTED PHOTO ===================');
});


bot.on('document', async (ctx) => {

});


// Обработка текстовых сообщений
bot.on('text', async (ctx) => {
    console.log(`Received message from ${ctx.chat.id}: ${ctx.message.text}`);
    await ctx.reply(`You wrote: ${ctx.message.text}`);
});



/**
 * Функция для отправки сообщения пользователю от бота
 * @param chatId - Telegram ID пользователя
 * @param text - Сообщение, которое нужно отправить
 */
export const sendMessageFromBot = async (chatId: string, text: string): Promise<void> => {
  try {
    console.log(`Sending message to chatId: ${chatId}, text: ${text}`);
    await bot.telegram.sendMessage(chatId, text);
    console.log(`Message sent successfully to chatId: ${chatId}`);
  } catch (error) {
    console.error(`Error sending message to chatId: ${chatId}`, error);
    throw error;
  }
};









// Function to launch the bot
export const launchBot = async () => {
  try {
    console.log('Launching Telegram bot...');
    await bot.launch();
    console.log('Telegram bot launched successfully!');
  } catch (error) {
    console.error('Error launching Telegram bot:', error);
    throw error;
  }
};

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
