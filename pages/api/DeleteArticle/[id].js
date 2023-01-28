import connectMongo from "../../../utils/connectMongo";
import Articles from "../../../Models/articleModel";

export default async function Delete(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log("DELETING DOCUMENT");
        // const article = await Articles.deleteOne({ id: req.body });
        console.log("DELETED DOCUMENT");
        res.send('OK LES LOULOUS')
       
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

// http://localhost:3000/api/DeleteArticle/delete