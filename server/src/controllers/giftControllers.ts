import { Request, Response } from "express";
import Gift from "../models/Gift";
import logger from "../logger";

export async function getAllGifts(req: Request, res: Response): Promise<void> {
	logger.info("/ GET called");
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

export async function getGiftById(req: Request, res: Response): Promise<void> {
	logger.info("/:id GET called");
	try {
		const { id } = req.params;
		const gift = await Gift.findById(id);

		if (!gift) {
			res.status(404).json({ message: "Gift not found." });
			return;
		}

		res.status(200).json({ data: gift });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error fetching gift by id." });
	}
}

export async function createGift(req: Request, res: Response): Promise<void> {
	logger.info("/ POST called");
	try {
		const newGift = req.body;
		const addedGift = await Gift.insertOne(newGift);

		res.status(200).json({
			message: `Successfully created gift with id: ${addedGift._id}, to database.`,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error creating gift." });
	}
}

export async function updateGift(req: Request, res: Response): Promise<void> {
	logger.info("/:id PUT called");
	try {
		const { id } = req.params;
		const updatedGift = req.body;
		const gift = await Gift.findByIdAndUpdate(id, { ...updatedGift });

		if (!gift) {
			res.status(404).json({ message: "Gift not found." });
			return;
		}

		res.status(200).json({
			message: `Successfully updated gift with id: ${id}.`,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error updating gift." });
	}
}

export async function deleteGift(req: Request, res: Response): Promise<void> {
	logger.info("/:id DELETE called");
	try {
		const { id } = req.params;

		const giftToDelete = await Gift.findByIdAndDelete(id);

		if (!giftToDelete) {
			res.status(404).json({ message: "Gift not found." });
			return;
		}

		res.status(200).json({
			message: `Successfully deleted gift with id: ${id}.`,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error deleting gift." });
	}
}
