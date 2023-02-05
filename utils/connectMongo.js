
import mongoose from "mongoose";
 const connectMongo = async () => {

	const mongo_connection = "mongodb+srv://Pizatol:NliQPeHlyWWCZhRS@cluster0.uwasos5.mongodb.net/Articles?retryWrites=true&w=majority"

	mongoose.connect(mongo_connection)

	mongoose.set('strictQuery', true)
}



export default connectMongo;