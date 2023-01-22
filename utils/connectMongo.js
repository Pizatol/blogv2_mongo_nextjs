
import mongoose from "mongoose";
 const connectMongo = async () => {
	mongoose.connect(process.env.MONGO_URI)
	mongoose.set('strictQuery', true)
}


export default connectMongo;