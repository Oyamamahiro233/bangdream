const cheerio = require("cheerio");
const appendData = require("./appendData");

module.exports = function mixMoudule(templateStr, url) {
  const $ = cheerio.load(templateStr);
  $("script").remove();
  $("link").remove();
  console.log('bind');
  url.map((value, i) => {
    console.log('.');
    if (value.urlJs.length > 0) {
      for (let i = 0; i < value.urlJs.length; i++) {
        const element = value.urlJs[i];
        $("body").append(`<script src="${element}"></script>`);
      }
    }
    if (value.urlCss.length > 0) {
      for (let i = 0; i < value.urlCss.length; i++) {
        const element = value.urlCss[i];
        $("head").append(`<link rel="stylesheet" href="${element}">`);
      }
    }
  })

  appendData($.html(), './', 'index.html')
  return
};  
