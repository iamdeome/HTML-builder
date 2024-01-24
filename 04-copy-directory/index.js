const fs = require('fs').promises;;
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const folderCopyDirrectory = path.join(__dirname, 'files-copy');


const copyDir = async () => {
    try {
        await fs.rm(folderCopyDirrectory, { recursive: true, force: true });
        await fs.mkdir(folderCopyDirrectory, { recursive: true });
        const files = await fs.readdir(pathFolder);
        await Promise.all(files.map(async (file) => {
            const sourcePath = path.join(pathFolder, file);
            const targetPath = path.join(folderCopyDirrectory, file);

            const stats = await fs.stat(sourcePath);
            await fs.copyFile(sourcePath, targetPath);
        }));
    } catch (err) {
        console.error('error', err);
    }
};


copyDir();