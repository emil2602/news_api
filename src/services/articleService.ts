import Article from "../models/Article";

export async function getArticleByAuthor (author: string) {
    const selctedAuthor = await Article.find({author: author}, {}, {
        limit: 10,
        lean: true
    });

    return selctedAuthor;
}

export async function getArticlesBySourceName (sourceName: string) {
    const selectedSourceName = await Article.find({ "source.name": sourceName  }, { }, {lean: true})

    return selectedSourceName;
}

export async function updateIsPublishedArticle (id) {
    const selectedArticle = await Article.updateOne({ _id: id}, {
        $set: {
            isPublished: true
        }
    }, {lean: true});

    return selectedArticle
}