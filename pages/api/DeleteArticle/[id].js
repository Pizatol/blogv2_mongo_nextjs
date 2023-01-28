import connectMongo from "../../../utils/connectMongo";
import Articles from "../../../Models/articleModel";

export default async function Delete(req, res) {
    const {
        query: { id },
        method,
    } = req;
    console.log("OK 1");
    await connectMongo();

    switch (method) {
        case "DELETE":
            try {
               
                const deletedArticle = await Articles.deleteOne({ _id: id });
             
                if (!deletedArticle) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                console.log(error.message);
            }

            break;

        default:
            break;
    }

   
}

// http://localhost:3000/api/DeleteArticle/delete
