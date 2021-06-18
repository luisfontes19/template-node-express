import path from "path";
import { ConnectionOptions } from "typeorm";

export const defaultConfig: ConnectionOptions = {
  name: "default",
  type: "sqlite",
  database: path.join(__dirname, "db.sqlite"),
  migrations: [path.join(__dirname, "migrations/**/*")],
  entities: [path.join(__dirname, "../entities/**/*")],
  logging: process.env.NODE_ENV?.startsWith("dev") ? true : false,
  cli: {
    migrationsDir: path.join(__dirname, "migrations/**/*"),
  },
  //synchronize: true
}