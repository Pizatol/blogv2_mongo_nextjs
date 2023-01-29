
import connectMongo from "../../../utils/connectMongo";
import Articles from "../../../Models/articleModel";

export default async function addArticle(req, res) {
	
	switch(method) {
		case 'POST' :
		try {
			console.log('CONNECTING TO MONGO');
			await connectMongo();
			console.log('CONNECTED TO MONGO');
			
			console.log('CREATING DOCUMENT');
			const article = await Articles.create(req.body);
			console.log('CREATED DOCUMENT');
			
			res.json({ article });
		} catch (error) {
			console.log(error);
			res.json({ error });
		}
	}
}