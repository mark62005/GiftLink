import { Request, Response, NextFunction } from "express";
import logger from "./logger";

export function globalErrorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	logger.error(err);
	res.status(500).send("Internal Server Error");
}
