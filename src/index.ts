
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {getArticleByQuery, getTopHeadlines} from "./Controllers/articleController";
import mongoose from "mongoose";
import cron from "node-cron";
const {Telegraf} = require('telegraf');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/news_api";

mongoose.connect(
    MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as mongoose.ConnectOptions
)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express + TypeScript!");
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        // let result = await getTopHeadlines("us")


    } catch (e) {
        console.log(e)
    }
});

// cron.schedule("* * */1 * *", async () => {
//     let result = await getTopHeadlines("us")
//
//     console.log("From schedule")
// })

const bot = new Telegraf('7762842818:AAG4iDWbsaWlwmshdkEUn5p3OYcoBzOIDOs');
const chatId = -1002385125610;

bot.start((ctx: any) => {
    ctx.reply("Start bot");
});

bot.on('text', (ctx: any) => {
    console.log(ctx.chat.id);
    ctx.reply(`message: "${ctx.message.text}"`);
});


bot.launch().then(() => {
    console.log('Бот запущен!');
}).catch((e: any) => console.log(e));

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
