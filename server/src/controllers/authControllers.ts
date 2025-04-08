import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../logger";
import User from "../models/User";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function registerUser(req: Request, res: Response): Promise<void> {
	logger.info("/register POST called");

	try {
		const { firstName, lastName, email, password } = req.body;

		if (!firstName || !lastName || !email || !password) {
			res.status(403).json({
				message: "First name, last name, email and password are required.",
			});
			return;
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(400).json({
				message:
					"Email has already been used by another user, please try another one.",
			});
			return;
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		await newUser.save();

		const payload = {
			user: {
				id: newUser._id,
			},
		};

		const authToken = jwt.sign(payload, JWT_SECRET ?? "");
		res.status(200).json({
			data: authToken,
			message: `User with ID: ${newUser._id} has been registered successfully.`,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error signing up user.", error });
	}
}
