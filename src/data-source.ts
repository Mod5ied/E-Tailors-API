import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "./app/entity/student.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "forential01pg",
    database: "test",
    synchronize: true, //creates a new db if not present!
    logging: false,
    entities: [Student],
    migrations: [],
    subscribers: [],
})
