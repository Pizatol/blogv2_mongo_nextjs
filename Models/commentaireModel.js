
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;



const CommentarySchema = new Schema({
	time: {
		 type: String,

		 // required: true,
	},
	comID: {
		 type: String,
		 // required: true,
	},
	commentaryText: {
		 type: String,
		 // required: true,
	},
	pseudo: {
		 type: String,
		 // required: true,
	},
	articleID: {
		 type: String,
		 // required: true,
	},
	commentaryIndex: {
		 type: Number,
	},
});


const Commentaires = models.Commentaires || model("Commentaires", CommentarySchema);

export default Commentaires