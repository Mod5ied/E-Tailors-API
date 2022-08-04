import { AppDataSource } from "./data-source";
// import { Student } from "./app/entity/student.entity";
import { Application } from "./app/server";

AppDataSource.initialize()
  .then(async () => {
    // console.log("Here you can setup and run express / fastify / any other framework.")
    const application: Application = new Application();
    application.startServer();
  })
  .catch((error) => console.log(error));
