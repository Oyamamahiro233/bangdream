const cheerio = require("cheerio");
module.exports = function getUrl(fileData = "") {
  const $ = cheerio.load(fileData);
  const urlCss = [];
  const urlJs = [];
  const urlImg = [];
  $('link[rel="stylesheet"]').each((index,element) => {
    const href = $(element).attr('href'); 
    if (href) urlCss.push(href);
  });
  $('script[src]').each((i, element) => {  
    const src = $(element).attr('src'); 
    if (src) urlJs.push(src);  
    
  });  

  
  return {
    urlCss,
    urlJs,
  };
};
