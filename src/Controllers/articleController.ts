import axios from 'axios';
import Article from "../models/Article";
const API_KEY = "6de693f3e86b437aa54d417e11d07564";
const URL = "https://newsapi.org/v2/";

interface IArticle {
    source: {
        id: number | null,
        name: string | null
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
}

export async function getTopHeadlines (country: string) : Promise<IArticle[]> {
    console.log("start")
    try {
        const response = await axios.get(URL + "top-headlines", {
            params: {
                country: country,
                apiKey: API_KEY
            }
        })
        if (response.data.status !== 'ok') {
            throw new Error(response.data?.message)
        }

        const newArticle = new Article(response.data?.articles)

        await Article.insertMany(response.data.articles);

        console.log("Saved")

        return response.data?.articles as IArticle[]
    }
    catch (error) {
        console.log("Log error: ", error);
        return []
    }
}

export async function getArticleByQuery (query: string) : Promise<IArticle[]> {
    try {
        const response = await axios.get(URL + "everything", {
            params: {
                q: query,
                apiKey: API_KEY
            }
        })

        if (response.data.status !== 'ok') {
            throw new Error(response.data?.message)
        }

        return response.data?.articles as IArticle[]
    } catch (e) {
        console.log(e)

        return []
    }
}