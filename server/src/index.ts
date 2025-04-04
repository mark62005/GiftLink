import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import logger from "./logger";
import mongoose from "mongoose";
import { globalErrorHandler } from "./error";
/* IMPORT ROUTES */

/* CONFIGURATIONS */
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(pino({ logger }));

// Global Error Handler
app.use(globalErrorHandler);

/* ROUTES */

/* MONGOOSE */
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@giftlinkcluster.donbyon.mongodb.net/?retryWrites=true&w=majority&appName=GiftLinkCluster`;

/* SERVER */
const port = process.env.PORT || 5001;

async function main() {
	if (!isProduction) {
		try {
			await mongoose.connect(uri);

			console.log("Connected to MongoDB.");

			app.listen(port, () => {
				console.log(`Server running on port ${port}...`);
			});
		} catch (error) {
			console.error(error);
		}
	}
}
main();
