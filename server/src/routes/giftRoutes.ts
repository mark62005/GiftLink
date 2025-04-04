import { Router } from "express";
import { getAllGifts } from "../controllers/giftControllers";

const router = Router();

router.get("/", getAllGifts);

export default router;
