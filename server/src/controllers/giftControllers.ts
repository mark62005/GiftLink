import { Request, Response } from "express";
import Gift from "../models/Gift";
import logger from "../logger";

export async function getAllGifts(req: Request, res: Response): Promise<void> {
	logger.info("/ called");
	try {
		const gifts = await Gift.find();

		if (gifts === undefined || gifts.length < 1) {
			res.status(404).json({ message: "Gifts not found." });
			return;
		}

		res.status(200).json({ data: gifts });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error fetching gifts." });
	}
}
