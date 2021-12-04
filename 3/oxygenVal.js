const fs = require('fs/promises');

let lines = [];

const findCommonBit = (index) => {
    const bits = [0, 0];
    for (const line of lines) {
        bits[line[index]]++;
    }
    if (bits[1] > bits[0]) {
        return 1;
    }
    if (bits[1] < bits[0]) {
        return 0;
    }
    if (bits[1] === bits[0]) {
        return 1;
    }
}

const main = async () => {
    const contents = await fs.readFile('input.txt');


    lines = contents.toString().split('\n');
    
    
    
    
    for (let i = 0; i < 12; i++) {
        const commonBit = +(findCommonBit(i));
        lines = lines.filter(line => line[i] === ""+commonBit);
        if (lines.length === 1) {
            break;
        }
    }    
    const co2Val = parseInt(lines[0], 2);
    console.log(co2Val);
}
main();
