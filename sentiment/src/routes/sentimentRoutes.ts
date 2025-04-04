import { Router } from "express";
import { fetchAnalysisResult } from "../controllers/sentimentControllers";

const router = Router();

router.post("/", fetchAnalysisResult);

export default router;
