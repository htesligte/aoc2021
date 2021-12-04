const fs = require('fs/promises');

let lines = [];

const findCommonBit1 = (index) => {
    const bits = [0, 0];
    for (const line of lines) {
        bits[line[index]]++;
    }
    return bits[1] > bits[0];
}

const findCommonBit = (index) => {
    const bits = [0, 0];
    for (const line of lines) {
        bits[line[index]]++;
    }
    return bits[1] >= bits[0];
}

const flip = (str) => {
    let retVal = [];
    for (let x = 0; x < str.length; x++) {
        if (str[x] === "0") {
            retVal[x] = "1";
        } else {
            retVal[x] = "0";
        }
    }
    return retVal.join("");
}

const main = async () => {
    const contents = await fs.readFile('sample.txt');





    lines = contents.toString().split('\n');
    
    let oxygenVal = [];
    for (let i = 0; i <5; i++) {
        const leastCommonBit = +(findCommonBit1(i));
        oxygenVal[i] = leastCommonBit;
    }
    //oxygenVal[4] = 0;
    
    console.log(oxygenVal);
    
    
    
    
    
    
    
    
    
    
    
    for (let i = 0; i < 5; i++) {
        const leastCommonBit = +(!findCommonBit(i));
        lines = lines.filter(line => line[i] === ""+leastCommonBit);
        if (lines.length === 1) {
            break;
        }
    }
    
    const co2Val = parseInt(lines[0], 2);
    console.log(co2Val, oxygenVal);
}
main();
