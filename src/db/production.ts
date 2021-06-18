import path from "path";
import { defaultConfig } from "./global";


// DO NOT STORE PASSWORDS HERE. PUT THEM iN THE .ENV FILES WHICH DO NOT GET INTO GIT
// YOU CAN DO process.env.YOUR_ENV_VAR_HERE
export = {
  ...defaultConfig,
  type: "sqlite",
  database: path.join(__dirname, "production.sqlite"),
}
