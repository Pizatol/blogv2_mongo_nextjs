import React from "react";

import EditArticle from "../../Components/EditArticle.jsx";
import Articles from "../../Models/articleModel";
import connectMongo from "../../utils/connectMongo";

export default function EditPage({ article }) {
    console.log(article);
    const data = {
        id: article._id,
        author: article.author,
        commentaryID: article.commentaryID,
        description: article.description,
        images: article.image,
        text: article.text,
        title: article.title,
        date: article.date,
    };

    return (
        <div>
            <h1>EDIT PAGE !</h1>

            <EditArticle data={data} />
        </div>
    );
}

export const getServerSideProps = async ({ params }) => {
    const id = params.id;
    console.log("edit page ID", id);

    try {
        await connectMongo();

        console.log("mongo connected");
        const article = await Articles.findById(id);

        console.log("data fetched");

        return {
            props: {
                article: JSON.parse(JSON.stringify(article)),
            },
        };
    } catch (error) {
        console.log(error.message);
    }
};
