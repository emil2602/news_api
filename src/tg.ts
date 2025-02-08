import { Telegraf } from "telegraf"
import {message} from "telegraf/filters";
import {log} from "node:util";

const TOKEN = "8192363988:AAGMpX1zPhZMg4e3Qy7tyZPLnYILZOKdjGo";

export const startBot = async () => {
    try {
        const bot = new Telegraf(TOKEN);
        console.log("bot created", bot)
        bot.start((ctx) => ctx.reply('Welcome'))

        await bot.launch().then(() => console.log('Telegram bot launched successfully!'));
    } catch (error) {
        console.error('Error launching Telegram bot:', error);
        throw error;
    }
};
//
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))