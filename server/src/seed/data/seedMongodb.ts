import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_DB_URI ?? "";
const filename = `${__dirname}/gifts.json`;
const dbName = "giftdb";
const collectionName = "gifts";

const data = JSON.parse(fs.readFileSync(filename, "utf-8")).docs;

async function seedData() {
	try {
		await mongoose.connect(uri);

		console.log("Connected to MongoDB.");
	} catch (error) {
		console.error("Error connecting MongoDB: ", error);
	}
}
