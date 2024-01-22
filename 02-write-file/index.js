const fs = require('fs');
const path = require('path');
const readline = require('readline')

const filePath = path.join(__dirname, 'text.txt');
const writeStr = fs.createWriteStream(filePath);

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('This is my console line, please, enter something or press "ctrl + c" or "exit" to quit');

rlInterface.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        console.log();
        writeStr.end();
        rlInterface.close();
    } else {
        writeStr.write(`${input}\n`);
    }
});