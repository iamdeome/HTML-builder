const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');

const styles = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');

const outputFolder = path.join(__dirname, 'project-dist');
const outputIndexPath = path.join(outputFolder, 'index.html');

const outputStyleFile = path.join(outputFolder, 'style.css');

const template = fs.readFileSync(templatePath, 'utf-8');
const templateContent = fs.readFileSync(templatePath, 'utf-8');



const createNewDir = () => {
    console.log('Starting the operation...');
    console.log('Creating new directory...');
    fs.mkdirSync(outputFolder, { recursive: true });
    console.log('Directory created!');

    const updatedContent = removeHTMLTemplates(templateContent, componentsFolder);
    fs.writeFileSync(outputIndexPath, updatedContent, 'utf-8');
    buildCssBundle();

    
};

const removeHTMLTemplates = (content, componentsFolder) => {
    console.log('Removing HTML templates...');

    let result = content;
    let startIndex = result.indexOf('{{');

    while (startIndex !== -1) {
        const endIndex = result.indexOf('}}', startIndex + 2);

        if (endIndex !== -1) {
            const tag = result.substring(startIndex + 2, endIndex);
            const componentFilePath = path.join(componentsFolder, `${tag}.html`);

            if (fs.existsSync(componentFilePath)) {
                const componentContent = fs.readFileSync(componentFilePath, 'utf-8');
                result = result.slice(0, startIndex) + componentContent + result.slice(endIndex + 2);
            } else {
                console.warn(`Component file not found: ${componentFilePath}`);
            }
        } else {
            break;
        }
        startIndex = result.indexOf('{{', endIndex + 2);
    }

    console.log('HTML Templates removed!');
    return result;
};


const buildCssBundle = () => {
    console.log('Creating styles bundle...');
    
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

    console.log('Styles bundle created!');
};

createNewDir();