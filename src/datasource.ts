import { DataSourceOptions, DataSource } from "typeorm";
import configuration from "./humblib-config/configuration";
import * as env from "dotenv";
env.config();
export let dataSourceOptions: DataSourceOptions = {} as DataSourceOptions;
Object.assign(dataSourceOptions, configuration().database);
Object.assign(dataSourceOptions, {
  entities: ["./dist/**/*.entity{.ts,.js}"],
  migrations: ["./src/migrations/*.js"],
});
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
