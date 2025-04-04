import express from "express";
import dotenv from "dotenv";
import pino from "pino-http";
import logger from "./logger";
import { globalErrorHandler } from "./error";
import sentimentRoutes from "./routes/sentimentRoutes";

/* CONFIGURATIONS */
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(express.json());
app.use(pino({ logger }));

// Global Error Handler
app.use(globalErrorHandler);

/* ROUTES */
app.use("/sentiment", sentimentRoutes);

/* SERVER */
const port = process.env.PORT || 5002;

if (!isProduction) {
	app.listen(port, () => {
		logger.info(`Server running on port ${port}...`);
	});
}
