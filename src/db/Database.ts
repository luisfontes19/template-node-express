import path from 'path';
import { Connection, createConnection } from 'typeorm';

export default class Database {

  public connection?: Connection;

  public static configFileName() {
    let env = process.env.NODE_ENV || "development";
    env = path.normalize(env).split("/").pop()!; //path traversal prevention
    return env;
  }

  public async init(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      import(`./${Database.configFileName()}`).then(config => {
        createConnection(config).then(c => {
          this.connection = c;
          resolve(c);
        }).catch(err => reject(err))
      }).catch(err => reject(err));
    })
  }

  public async syncronize() {

    if (this.connection?.options.type === "sqlite")
      await this.connection.query('PRAGMA foreign_keys=OFF');

    await this.connection?.synchronize();

    if (this.connection?.options.type === "sqlite")
      await this.connection.query('PRAGMA foreign_keys=ON');

  }

}