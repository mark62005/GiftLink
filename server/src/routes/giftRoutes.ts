import { Router } from "express";
import {
	createGift,
	deleteGift,
	getAllGifts,
	getGiftById,
	updateGift,
} from "../controllers/giftControllers";

const router = Router();

router.get("/", getAllGifts);
router.get("/:id", getGiftById);
router.post("/", createGift);
router.put("/:id", updateGift);
router.delete("/:id", deleteGift);

export default router;
