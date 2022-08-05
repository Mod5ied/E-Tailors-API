import { appRouter } from "../routes/app.router";
import express, { Express } from "express";
import { errorHandler } from "../../utils";
import * as dotenv from "dotenv";
import helmet from "helmet";
import pino from "pino";
import cors from "cors";
dotenv.config();

export class Application {
  private _server: Express;

  constructor() {
    this._server = express();
    this._server.set("port", process.env.APP_PORT);
    this._server.set("host", process.env.APP_HOST);

    this._server.use(express.urlencoded({ extended: true }));
    this._server.use(express.json());
    this._server.use(helmet());
    this._server.use(cors());

    this._server.use(appRouter);
    this._server.use(errorHandler);
  }

  public startServer(): void {
    const port: number = this._server.get("port");
    const host: string = this._server.get("host");

    this._server.listen(port, host, () => {
      console.log(`Everytin soft at http:${host}:${port}`);
    });
  }
}
