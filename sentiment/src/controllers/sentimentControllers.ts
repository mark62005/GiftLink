import { Request, Response } from "express";
import natural from "natural";
import logger from "../logger";

export async function fetchAnalysisResult(
	req: Request,
	res: Response
): Promise<void> {
	logger.info("/ POST called");

	let { sentence } = req.query;

	if (!sentence) {
		logger.error("Sentence is required. Please try again.");
		res.status(400).json({ error: "Bad request. No sentence provided." });
		return;
	}
	sentence = sentence as string;

	// Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
	const Analyzer = natural.SentimentAnalyzer;
	const stemmer = natural.PorterStemmer;
	const analyzer = new Analyzer("English", stemmer, "afinn");

	// Perform sentiment analysis
	try {
		const analysisResult = analyzer.getSentiment(sentence.split(" "));
		let sentiment = "neutral";

		if (analysisResult < 0) {
			sentence = "negative";
		} else if (analysisResult > 0.33) {
			sentence = "positive";
		}

		// Logging the result
		logger.info(`Sentiment analysis result: ${analysisResult}`);

		// Responding with the sentiment analysis result
		res
			.status(200)
			.json({ data: { sentimentScore: analysisResult, sentiment } });
	} catch (error) {
		logger.error(`Error performing sentiment analysis: ${error}`);
		res.status(500).json({ message: "Error performing sentiment analysis" });
	}
}
