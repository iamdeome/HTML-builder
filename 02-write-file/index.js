const fs = require('fs');
const path = require('path');
const readline = require('readline')

const wrStr = fs.createWriteStream('text.txt');

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('This is my console line, please, enter something or press "ctrl + c" to quit');

rlInterface.on('line', (input) => {
    console.log(input.trim());
    wrStr.write(input + '\n');
});