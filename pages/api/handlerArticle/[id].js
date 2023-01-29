import connectMongo from "../../../utils/connectMongo";
import Articles from "../../../Models/articleModel";

export default async function Delete(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await connectMongo();

    switch (method) {
        case "POST":
            try {
                console.log("CONNECTING TO MONGO");
                await connectMongo();
                console.log("CONNECTED TO MONGO");

                console.log("CREATING DOCUMENT");
                const article = await Articles.create(req.body);
                console.log("CREATED DOCUMENT");

                res.json({ article });
            } catch (error) {
                console.log(error);
                res.json({ error });
            }

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

        case "PUT":
            try {
                const article = await Articles.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!article) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: pet });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            break;
    }
}

// http://localhost:3000/api/DeleteArticle/delete
