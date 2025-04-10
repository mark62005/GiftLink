import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_DB_URI ?? "";

async function connectToMongoDB(): Promise<void> {
	try {
		await mongoose.connect(uri);

		console.log("Connected to MongoDB.");
	} catch (error) {
		throw error;
	}
}
export default connectToMongoDB;
