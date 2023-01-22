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
    author: {
        type: String,
    },
    image: {
        type: Array,
    },
    commentaryID: {
        type: String,
    },
});

const Article_model = models.Article || model("Articles", ArticleSchema);

export default Article_model;
