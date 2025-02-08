
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {getArticleByQuery, getTopHeadlines} from "./Controllers/articleController";
import mongoose from "mongoose";
import cron from "node-cron";
import { launchBot } from "./tgbot";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
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
    console.info(`Server started at PORT :${PORT}`);
    try {
      await launchBot();
      console.warn('Sending message...');
      
    } catch (error) {
      console.error('Error launching bot:', error);
    }
});


//в час нлчи 1 раз

cron.schedule("0 1 * * *", async () => {
    let result = await getTopHeadlines("us");
    //!!  save to db 

    console.log("From schedule");
}, {
    timezone: "Europe/Kiev" // Указываем часовой пояс для Киева
});



cron.schedule("0 2 * * *", async () => {

    let result = await getArticleByQuery("Ukraine");
    console.log("From schedule");
    //!!  save to db
}, {
    timezone: "Europe/Kiev" // Указываем часовой пояс для Киева
});

