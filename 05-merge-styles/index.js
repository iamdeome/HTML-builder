const fs = require('fs');
const path = require('path');

const styles = path.join(__dirname, 'styles');

const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputFolder, 'bundle.css');

const buildBundle = () => {
    const stylesArray = [];
     const files = fs.readdirSync(styles);

    files.forEach(file => {
        const filePath = path.join(styles, file);
        const cssFile = file => path.extname(file) === '.css';
        if (fs.statSync(filePath).isFile() && cssFile(file)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            stylesArray.push(content);
        }
    });
    const cont = stylesArray.join('\n');
    fs.writeFileSync(outputFile, cont, 'utf-8');

    console.log('Styles bundled successfully!');

};

buildBundle(); 