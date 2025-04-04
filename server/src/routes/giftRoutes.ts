import { Router } from "express";
import { getAllGifts, getGiftById } from "../controllers/giftControllers";

const router = Router();

router.get("/", getAllGifts);
router.get("/:id", getGiftById);

export default router;
