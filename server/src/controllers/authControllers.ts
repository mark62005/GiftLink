import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ICustomJwtPayload, ICustomRequest, IUserProfile } from "../types";
import logger from "../logger";
import User from "../models/User";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

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

		const payload: ICustomJwtPayload = {
			user: {
				id: newUser._id.toString(),
			},
		};

		const authToken = jwt.sign(payload, JWT_SECRET);
		res.status(200).json({
			data: authToken,
			message: `User with ID: ${newUser._id} has been registered successfully.`,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error signing up user.", error });
	}
}

export async function signIn(req: Request, res: Response): Promise<void> {
	logger.info("/sign-in POST called");

	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(403).json({
				message: "Email and password are required.",
			});
			return;
		}

		const targetUser = await User.findOne({ email });

		if (!targetUser) {
			res.status(404).json({ message: "User not found." });
			return;
		} else {
			const isPasswordMatch = await bcryptjs.compare(
				password,
				targetUser.password
			);
			if (!isPasswordMatch) {
				res.status(403).json({ message: "Password does not match." });
				return;
			}

			const payload: ICustomJwtPayload = {
				user: {
					id: targetUser._id.toString(),
				},
			};

			const firstName = targetUser.firstName;
			const email = targetUser.email;
			const authToken = jwt.sign(payload, JWT_SECRET);

			logger.info("User logged in successfully.");
			res.status(200).json({ firstName, email, authToken });
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error signing in user.", error });
	}
}

export async function updateUserProfile(
	req: ICustomRequest,
	res: Response
): Promise<void> {
	logger.info("/update-user PUT called");

	try {
		const userId = req.user!.id;
		const { firstName, lastName, email } = req.body;

		if (!firstName && !lastName && !email) {
			res.status(400).json({
				message:
					"At least one field of first name, last name or email is required.",
			});
			return;
		}

		const updatedUserFiels: Partial<IUserProfile> = {};
		if (firstName) updatedUserFiels.firstName = firstName;
		if (lastName) updatedUserFiels.lastName = lastName;
		if (email) updatedUserFiels.email = email;

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $set: updatedUserFiels },
			{ new: true, runValidators: true }
		).select("-password");

		if (!updatedUser) {
			res.status(404).json({ message: "User not found." });
			return;
		}

		res.status(200).json({
			data: updatedUser,
			message: "User profile updated successfully.",
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error updating user.", error });
	}
}
