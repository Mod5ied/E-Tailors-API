import { errCodeT, errStatusT } from "./type.error";

export class HttpException extends Error {
  code: errCodeT;
  message: errStatusT;
  logMessage?: errStatusT | null;

  constructor(code: errCodeT, message: errStatusT, logMessage?: errStatusT | null) {
    super(message);
    this.code = code;
    this.message = message;
    this.logMessage = logMessage;
  }
}
