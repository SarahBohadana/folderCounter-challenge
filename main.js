// import fs from 'fs/promises'

console.time('length');
// const path = './node_modules';
// const path = './tests';
// let counter = 0;


// async function fileCounter(){
//   let data = await fs.readdir(path, {withFileTypes:true});
//   for (const dirent of data) {
//     console.log(dirent.name)
//     console.log(path)
    
//     if (dirent.isDirectory()){
//       await fileCounter(`${path}/${dirent.name}`);
//     } else if (dirent.isFile) {
//       counter++;
//     }
//   }
//   console.log({counter})
// }

// fileCounter(path)

// let files  = [];

// function throughDirectory(directory) {
//     fs.readdirSync(directory, 'utf8').forEach(file => {
//         const absolute = path.join(directory, file);
//         if (fs.statSync(Absolute).isDirectory()) return throughDirectory(absolute);
//         else return files.push(absolute);
//     });
//     console.log(files.length);
// }

// throughDirectory(path);

// import fs from 'fs/promises'
// const fs = require("fs");
// const path = require("path");
// let files = [];

// const getFilesRecursively = (directory) => {
//   const filesInDirectory = fs.readdirSync(directory);
//   for (const file of filesInDirectory) {
//     const absolute = path.join(directory, file);
//     if (fs.statSync(absolute).isDirectory()) {
//         getFilesRecursively(absolute);
//     } else {
//         files.push(absolute);
//     }
//   }
// };


const fs = require("fs");
const path = require("path");

const tests = './tests';
const node = './node_modules';
const foldersList = [];
const filesList = [];
let fileCounter = 0;

function fileCount(folderPaths){
    folderPaths.forEach(folderPath => {
        const results = fs.readdirSync(folderPath);
        const folders = results.filter(res => fs.lstatSync(path.resolve(folderPath,res)).isDirectory());
        const files = results.filter(res => fs.lstatSync(path.resolve(folderPath,res)).isFile());
        const innerFolderPaths = folders.map(folder => path.resolve(folderPath,folder));
        const innerFilePaths = files.map(file => path.resolve(folderPath,file));
        console.log('result: ' + files);
        if (files.length > 0){
            fileCounter += files.length;
        }
        if (innerFolderPaths == 0) {
            return
        }
        innerFolderPaths.forEach(innerFolder => foldersList.push(innerFolder));
        innerFilePaths.forEach(innerFile => filesList.push(innerFile));
        fileCount(innerFolderPaths);
        console.log(`there are ${fileCounter} files in ${tests}`);
    })
}
fileCount([path.resolve(node)]);

console.log([path.resolve(node)]);
// console.log(foldersList);
// console.log(filesList);

// console.timeEnd('length');