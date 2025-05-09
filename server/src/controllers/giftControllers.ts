import { Request, Response } from "express";
import Gift from "../models/Gift";
import logger from "../logger";

export async function getAllGifts(req: Request, res: Response): Promise<void> {
	logger.info("/ GET called");
	try {
		const gifts = await Gift.find().exec();

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
		const gift = await Gift.findById(id).exec();

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
		const gift = req.body;
		const newGift = new Gift({
			...gift,
		});

		await newGift.save();

		res.status(200).json({
			message: `Successfully created gift with id: ${newGift._id}, to database.`,
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
		let giftToUpdate = await Gift.findById(id);

		if (!giftToUpdate || giftToUpdate === null) {
			res.status(404).json({ message: "Gift not found." });
			return;
		}

		giftToUpdate = { ...giftToUpdate, ...updatedGift };
		await giftToUpdate?.save();

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

		const giftToDelete = await Gift.findById(id).exec();

		if (!giftToDelete) {
			res.status(404).json({ message: "Gift not found." });
			return;
		}

		await giftToDelete.deleteOne();

		res.status(200).json({
			message: `Successfully deleted gift with id: ${id}.`,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error deleting gift." });
	}
}
