import { Request, Response } from "express";
import Gift from "../models/Gift";
import logger from "../logger";

export async function searchGifts(req: Request, res: Response): Promise<void> {
	logger.info("/ GET called");
	try {
		const query = req.query;
		let searchQuery: {
			name: { $regex: string; $options: "i" } | null;
			category: string | null;
			condition: string | null;
			age_years: number | null;
		} = {
			name: null,
			category: null,
			condition: null,
			age_years: null,
		};

		/* NAME */
		if (
			query.name &&
			typeof query.name === "string" &&
			query.name?.trim() !== ""
		) {
			searchQuery.name = { $regex: query.name, $options: "i" };
		}

		/* CATEGORY */
		if (query.category) {
			searchQuery.category = query.category as string;
		}

		/* CONDITION */
		if (query.condition) {
			searchQuery.condition = query.condition as string;
		}

		/* AGE YEARS */
		if (query.age_years) {
			searchQuery.age_years = parseInt(query.age_years as string);
		}

		const gifts = await Gift.find(searchQuery).exec();

		if (!gifts || gifts.length < 1) {
			res.status(404).json({ message: "Gifts not found." });
			return;
		}

		res.status(200).json({ data: gifts });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error fetching gifts." });
	}
}
