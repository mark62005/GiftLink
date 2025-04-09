import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ICustomJwtPayload, ICustomRequest } from "../types";
import logger from "../logger";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export function verifyAuthToken(
	req: ICustomRequest,
	res: Response,
	next: NextFunction
): void {
	const authHeader = req.headers["authorization"];
	const authToken = authHeader && authHeader.split(" ")[1];

	if (!authToken) {
		res.status(401).json({ message: "Access denied. No token provided." });
		return;
	}

	try {
		const decoded = jwt.verify(authToken, JWT_SECRET) as ICustomJwtPayload;

		req.user = decoded.user;
		next();
	} catch (error) {
		logger.error("Error verifying token: ", error);
		res.status(403).json({ message: "Invalid or expired token." });
		return;
	}
}
