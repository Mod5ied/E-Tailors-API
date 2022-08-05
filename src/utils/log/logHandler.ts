import logger from "./logConfig";
import { Request, Response, NextFunction } from "express";

export const saveLogs = async (req: Request, res: Response, next: NextFunction) => {
  const response = res.locals.data;
  logger.info({ resCode: 200, status: response });
};
