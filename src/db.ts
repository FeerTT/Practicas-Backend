import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Task } from "./entities/Task";


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '1234',
    port: 5432,
    database: 'dbpractice',
    entities: [User, Task],
    logging: true,
    synchronize:true,
})