import mongoose from "mongoose";
import { Schema, model, models } from 'mongoose';

const ArticleSchema = new Schema({
    description: {
        type: String,
    },
    title: {
        type: String,
    },

    text: {
        type: String,
    },
    date: {
        type: String,
    },
    keyWord: {
        type: String,
    },
    image: {
        type: Array,
    },
    commentaryID: {
        type: String,
    },
});

const Articles = models.Articles || model("Articles", ArticleSchema);

export default Articles;
