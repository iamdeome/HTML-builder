const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const folderCopyDirrectory = path.join(__dirname, 'files-copy');


const copyDir = async() => {
    fs.rm(folderCopyDirrectory, { recursive: true, force: true });
    fs.mkdir(folderCopyDirrectory, { recursive: true });
    const files = fs.readdirSync(pathFolder);
    files.forEach(file => {
        const sourcePath = path.join(pathFolder, file);
        const targetPath = path.join(folderCopyDirrectory, file);
        const stats = fs.statSync(sourcePath);
        fs.copyFileSync(sourcePath, targetPath);
    });
};

copyDir();