import { Router } from "express";
import {
	createGift,
	getAllGifts,
	getGiftById,
} from "../controllers/giftControllers";

const router = Router();

router.get("/", getAllGifts);
router.get("/:id", getGiftById);
router.post("/", createGift);

export default router;
