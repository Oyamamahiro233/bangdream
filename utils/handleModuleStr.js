const getStr = require('./getStr')
const path =require('path')
const cheerio = require("cheerio");
module.exports = function handleModuleStr(file) {
  const pathFile = path.resolve('./',file)
  const Mstr = getStr(pathFile);
  const $ = cheerio.load(Mstr);
  return $('body').first().html();
};
