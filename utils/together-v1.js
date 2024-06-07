const config = require("./config");
const getStr = require("./getStr");
const removeHtml = require("./removeHtml");
const mixElement = require("./mixElement");
const handleModuleStr = require("./handleModuleStr");
const getUrl = require("./geturl");
const mixMoudule = require("./mixModule");
let url = [];
function handleTemplat() {
  let result = getStr(config.template);
  for (let i = 0; i < config.module.length; i++) {
    result = mixElement(
      result,
      removeHtml(config.module[i]),
      handleModuleStr(config.module[i])
    );
    url[i] = getUrl(getStr(config.module[i]));
  }
  url[config.module.length + 1] = getUrl(getStr(config.template));
  return result;
}
function main() {
  const template = handleTemplat();
  mixMoudule(template, url);
}
main();
