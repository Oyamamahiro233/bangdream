const  path =require('path')
const fs =require('fs')
module.exports = function testDirectory(filePath) {
  return new Promise((resolve, reject) => {
    const dirPath = path.resolve(filePath, "../");
    fs.access(dirPath, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(dirPath, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            reject(mkdirErr);
          } else {
            resolve("NO SUCH DIRECTORY,already create");
          }
        });
      }
    });
    resolve('')
  });
};
