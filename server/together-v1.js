const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const files = ["nav.html", "calendar.html"];
const template = "bang-bream.html";
const moduleData = [];
const OUT = './dist'
function getStr(file) {
  return fs.readFileSync(path.resolve("./", file), "utf-8");
}
function removeHtml(file){
return file.split(".")[0]
}
function mixElement(template = "", elementtName = [], moduleData = []) {
  const $ = cheerio.load(getStr(template));
  for (let i = 0; i < elementtName.length; i++) {
    const name = elementtName[i];
    $(name).before(moduleData[i]);
    $(name).remove();
  }
  appendData($.html(), template);
}
function handleModuleStr(file) {
  const Mstr = getStr(file);
  const $ = cheerio.load(Mstr);
  return $("body").children().html();
}
function appendData(data,fileName) {
  let filePath = path.resolve(__dirname, '../', OUT , fileName);
  console.log(filePath);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });
  }
  testDirectory(filePath)
  fs.appendFile(filePath, data, (err) => {
    if (err) console.log(err);
  });
}
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  moduleData.push(handleModuleStr(file));
}
function testDirectory(filePath) {
  return new Promise((resolve, reject) => {
    const dirPath = path.resolve(filePath, "../");
    fs.access(dirPath, fs.constants.F_OK, (err) => {  
      if (err) {  
        fs.mkdir(dirPath, { recursive: true }, (mkdirErr) => {  
          if (mkdirErr) {  
            reject(mkdirErr);  
          } else {  
            resolve();  
          }  
        });  
      }  
    });  


  });
}
async function copyFile(src, dest, callback) {
  await testDirectory(dest)
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dest);
  readStream.on("error", (err) => {
    // 当读取流出现错误时，尝试删除已创建的目标文件
    fs.unlink(dest, (unlinkErr) => {
      if (unlinkErr) {
        console.error(
          "Error deleting partial/corrupted destination file:",
          unlinkErr
        );
      }
      if (callback) callback(err);
    });
  });

  writeStream.on("error", (err) => {
    // 当写入流出现错误时，也尝试删除可能已损坏的目标文件
    fs.unlink(dest, (unlinkErr) => {
      if (unlinkErr) {
        console.error(
          "Error deleting partial/corrupted destination file:",
          unlinkErr
        );
      }
    });
    if (callback) callback(err);
  });

  writeStream.on("close", () => {
    if (callback) callback(null); // 文件复制成功时调用回调，无错误
  });

  readStream.pipe(writeStream);
}
mixElement(template, files, moduleData);
function togetherResource(file) {
  const $ = cheerio.load(getStr(file));
  $("[src]").each(function (i, elem) {
    const resourceURL = $(this).attr("src");
    if (elem.name === "img") {
      copyFile(
        path.resolve(__dirname, "../", resourceURL),
        path.resolve(__dirname, "../", `result/${ resourceURL}`),
        logErr
      );
    } else if (elem.name === 'script') {
      appendData(getStr(resourceURL), 'bundle.js')
    }
  });
}

togetherResource(template);


function logErr(err) {
  if (err) console.log(err);
}
