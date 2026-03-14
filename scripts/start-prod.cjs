const path = require("node:path");

process.chdir(path.resolve(__dirname, "..", "dist"));
require(path.join(process.cwd(), "main.js"));