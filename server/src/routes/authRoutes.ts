import { Router } from "express";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import {
	registerUser,
	signIn,
	updateUserProfile,
} from "../controllers/authControllers";

const router = Router();

router.post("/register", registerUser);
router.post("/sign-in", signIn);
router.put("/update-user", verifyAuthToken, updateUserProfile);

export default router;
