import { AppDataSource } from "./data-source";
// import { Student } from "./app/entity/student.entity";
import { Application } from "./app/server";
import logger from "./utils/log/logConfig";

AppDataSource.initialize()
  .then(async () => {
    const application: Application = new Application();
    application.startServer();
  })
  .catch((err) => {
    logger.fatal(`Error starting App - ${err.message}`);
  });
