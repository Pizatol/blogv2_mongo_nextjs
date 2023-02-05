
import mongoose from "mongoose";
 const connectMongo = async () => {

	const mongo_connection = process.env.MONGODB_URI

	mongoose.connect(mongo_connection)

	mongoose.set('strictQuery', true)
}



export default connectMongo;