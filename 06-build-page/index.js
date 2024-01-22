const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');

const styles = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');

const outputFolder = path.join(__dirname, 'project-dist');

const outputStyleFile = path.join(outputFolder, 'style.css');

const template = fs.readFileSync(templatePath, 'utf-8');
const templateContent = fs.readFileSync(templatePath, 'utf-8');



const createNewDir = () => {
    fs.mkdirSync(outputFolder, { recursive: true });
    removeHTMLTemplates(templateContent, componentsFolder);
    buildCssBundle();
};

const removeHTMLTemplates = (content, componentsFolder) => {
    let result = content;
    let startIndex = result.indexOf('{{');
    
    while (startIndex !== -1) {
        const endIndex = result.indexOf('}}', startIndex + 2);

        if (endIndex !== -1) {
            const tag = result.substring(startIndex + 2, endIndex);
            const componentFilePath = path.join(componentsFolder, `${tag}.html`);

            fs.existsSync(componentFilePath)
            const componentContent = fs.readFileSync(componentFilePath, 'utf-8');
            result = result.slice(0, startIndex) + componentContent + result.slice(endIndex + 2);
        } else {
            break; 
        }

        startIndex = result.indexOf('{{', endIndex + 2);
    }

    return result;
}


const buildCssBundle = () => {
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
    fs.writeFileSync(outputStyleFile, cont, 'utf-8');

    console.log('Styles bundled successfully!');

};