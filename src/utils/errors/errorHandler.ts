import logger from "../log/logConfig";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "./errorParser";

export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.code || 500;
  const message = err.message || "Something went wrong!";
  const logData = res.locals.data;
  const stack = err.stack;

  if (!err) return logger.error({ code: statusCode, status: logData, stack: stack });
  logger.warn({
    code: statusCode,
    issue: logData,
    stack: process.env.NODE_ENV === "production" ? "available in prod!" : err.stack,
  });
  return res.status(statusCode).send({ status: message });
};
