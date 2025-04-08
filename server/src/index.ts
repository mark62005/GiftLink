import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import logger from "./logger";
import { globalErrorHandler } from "./error";
import connectToMongoDB from "./db";
/* IMPORT ROUTES */
import giftRoutes from "./routes/giftRoutes";
import searchRoutes from "./routes/searchRoutes";
import authRoutes from "./routes/authRoutes";

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
app.use("/api/gifts", giftRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);

/* SERVER */
const port = process.env.PORT || 5001;

async function main() {
	if (!isProduction) {
		try {
			await connectToMongoDB();

			app.listen(port, () => {
				console.log(`Server running on port ${port}...`);
			});
		} catch (error) {
			console.error("Error connecting MongoDB: ", error);
			return;
		}
	}
}
main();
