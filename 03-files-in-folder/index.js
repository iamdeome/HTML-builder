const fs = require('fs');
const path = require('path');
const directory = './03-files-in-folder/secret-folder';

fs.readdir(directory, { withFileTypes: true }, (error, files) => {
    files.forEach(file => {
        if (file.isFile()) {
            const filePath = path.join(directory, file.name);
            fs.stat(filePath, (error, stats ) => {
                const sizeKB = stats.size / 1024;
                const extens = path.extname(file.name).slice(1);
                const name = path.basename(file.name, '.' + extens);
                console.log(`${name}-${extens}-${sizeKB}KB`);
            });
        }
    });
});
