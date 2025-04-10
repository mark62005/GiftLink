import { Router } from "express";
import { searchGifts } from "../controllers/searchControllers";

const router = Router();

router.get("/", searchGifts);

export default router;
