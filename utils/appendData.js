const testDirectory = require("./testDirectory");
const path = require("path");
const fs = require("fs");
const config = require("./config");
module.exports = function appendData(data, dirName, fileName) {
  let filePath = path.resolve("./", dirName, fileName);
  if (config.clear) {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    }
  }
  testDirectory(filePath).then((result) => {
    console.log("success bouding");
    fs.appendFile(filePath, data, (err) => {
      console.log(result);
      if (err) {
        console.log(err);
        return;
      }
    });
    return;
  });
};
