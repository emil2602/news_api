import mongoose, { Schema, Document } from "mongoose";

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
    isPublished: boolean,
}

const ArticleSchema: Schema = new Schema<IArticle>({
    source: {
        id: { type: String },
        name: { type: String },
    },
    author: { type: String },
    title: { type: String},
    description: { type: String },
    url: { type: String },
    urlToImage: { type: String},
    publishedAt: { type: String },
    content: { type: String },
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Article", ArticleSchema);