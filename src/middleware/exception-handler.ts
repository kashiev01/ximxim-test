import { NextFunction, Request, Response } from "express";

export const ExceptionHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(500).json({ error: err.message })
};