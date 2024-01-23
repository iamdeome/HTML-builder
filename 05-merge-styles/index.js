const fs = require('fs').promises;
const path = require('path');

const styles = path.join(__dirname, 'styles');

const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputFolder, 'bundle.css');

const buildBundle = async () => {
    try {
        const stylesArray = [];
        const files = await fs.readdir(styles);

        await Promise.all(files.map(async (file) => {
            const filePath = path.join(styles, file);
            const cssFile = (file) => path.extname(file) === '.css';
            if ((await fs.stat(filePath)).isFile() && cssFile(file)) {
                const content = await fs.readFile(filePath, 'utf-8');
                stylesArray.push(content);
            }
        }));
        const cont = stylesArray.join('\n');
        await fs.writeFile(outputFile, cont, 'utf-8');

        console.log('bundled successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
};

buildBundle(); 