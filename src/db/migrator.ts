import cp from "child_process";
import Database from "./Database";

const op = process.argv[2]

const dbFileName = Database.configFileName()
const extension = __filename.endsWith(".ts") ? ".ts" : ".js";
const dbConfig = dbFileName + extension;
const command = __filename.endsWith(".ts") ? "ts-node" : "node";
const cli = "../../node_modules/typeorm/cli.js"

if (["create", "run", "revert", "generate"].includes(op)) {
  let args = `-f ${dbConfig}`
  if (op === "create" || op === "generate") args += " -n " + process.argv[3];

  const c = `${command} ${cli} migration:${op} ${args}`;
  cp.exec(c, { cwd: __dirname }, (err, out) => {
    if (err) console.error(err);
    if (out) console.log(out)
  })
}
else {
  console.log("Invalid operation " + op)
}