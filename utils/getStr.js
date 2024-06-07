const fs = require("fs");
const path = require("path");
module.exports = function getStr(file) {
  return fs.readFileSync(path.resolve("./", file.toLowerCase()), "utf-8");
};
