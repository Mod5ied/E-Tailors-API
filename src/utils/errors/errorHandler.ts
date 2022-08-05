import logger from "../log/logConfig";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "./errorParser";

export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.code || 500;
  const message = err.message || "Something went wrong!";
  const logMessage = res.locals.data;

  if (!err) return logger.error({ code: statusCode, status: logMessage });
  logger.warn({ code: statusCode, issue: logMessage });
  return res.status(statusCode).send({ status: message });
};
