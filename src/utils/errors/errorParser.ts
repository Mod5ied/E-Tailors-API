import { errCodeT, errStatusT } from "./type.error";

export class HttpException extends Error {
  code: errCodeT;
  message: errStatusT;
  logData?: errStatusT | null | void;

  constructor(code: errCodeT, message: errStatusT, logData?: errStatusT | null | void) {
    super(message);
    this.code = code;
    this.message = message;
    this.logData = logData;
  }
}
