import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error(err);
	res.status(500).send("Internal Server Error");
}
