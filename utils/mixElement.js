const cheerio = require("cheerio");
module.exports = function mixElement(templateStr = "", moduleName = "" ,data ="") {
  const $ = cheerio.load(templateStr);
  $(moduleName).before(data)
  $(moduleName).remove()
   return $.html()
};
