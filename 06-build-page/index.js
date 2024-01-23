const fs = require('fs').promises;
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');

const templateContent = async () => await fs.readFile(templatePath, 'utf-8');

const outputFolder = path.join(__dirname, 'project-dist');
const outputIndexPath = path.join(outputFolder, 'index.html');
const outputStyleFile = path.join(outputFolder, 'style.css');
const outputAssetsPath = path.join(outputFolder, 'assets');

const createNewDir = async () => {
    console.log('Starting the operation...');
    console.log('Creating new directory...');
    await fs.mkdir(outputFolder, { recursive: true });
    console.log('Directory created!');

    const updatedContent = await removeHTMLTemplates(await templateContent(), componentsFolder);
    await fs.writeFile(outputIndexPath, updatedContent, 'utf-8');

    await buildCssBundle();

    console.log('Copying assets...');
    await copyDir(assetsFolder, outputAssetsPath);
    console.log('Assets copied');
    console.log('Buying cookies...');
    console.log('Making tee...');
    console.log('Done!');
};

const removeHTMLTemplates = async (content, componentsFolder) => {
    console.log('Removing HTML templates...');

    let result = content;
    let startIndex = result.indexOf('{{');

    while (startIndex !== -1) {
        const endIndex = result.indexOf('}}', startIndex + 2);

        if (endIndex !== -1) {
            const tag = result.substring(startIndex + 2, endIndex);
            const componentFilePath = path.join(componentsFolder, `${tag}.html`);

            try {
                const componentContent = await fs.readFile(componentFilePath, 'utf-8');
                result = result.slice(0, startIndex) + componentContent + result.slice(endIndex + 2);
            } catch (error) {
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


const buildCssBundle = async () => {
    console.log('Creating styles bundle...');
    
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
    await fs.writeFile(outputStyleFile, cont, 'utf-8');

    console.log('Styles bundle created!');
};

const copyDir = async (assetsFolder, outputAssetsPath) => {
    await fs.mkdir(outputAssetsPath, { recursive: true });
    
    const files = await fs.readdir(assetsFolder);

    await Promise.all(files.map(async (file) => {
        const sourcePath = path.join(assetsFolder, file);
        const destPath = path.join(outputAssetsPath, file);

        if ((await fs.stat(sourcePath)).isFile()) {
            await fs.copyFile(sourcePath, destPath);
        } else if ((await fs.stat(sourcePath)).isDirectory()) {
            await copyDir(sourcePath, destPath);
        }
    }));
}

createNewDir();