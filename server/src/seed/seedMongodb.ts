import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import connectToMongoDB from "../db";
import Gift from "../models/Gift";

dotenv.config();

export default async function seed() {
	const filename = `${__dirname}/data/gifts.json`;
	const data: { [key: string]: any }[] = JSON.parse(
		fs.readFileSync(filename, "utf-8")
	).docs;

	try {
		await connectToMongoDB();

		// Clear all data
		await Gift.deleteMany({});

		console.log("Seeding data...");

		await Gift.insertMany(data);

		console.log(
			"\x1b[32m%s\x1b[0m",
			`Inserted documents: ${data.length} \nSuccessfully seeded data to database.`
		);

		mongoose.connection.close();
	} catch (error) {
		console.error("Error connecting MongoDB: ", error);
		return;
	}
}

if (require.main === module) {
	seed().catch((error) => {
		console.error("Failed to run seed script:", error);
	});
}
