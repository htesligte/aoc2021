const fs = require('fs/promises');

let lines = [];

const findCommonBit = (index) => {
    const bits = [0, 0];
    for (const line of lines) {
        bits[line[index]]++;
    }
    return bits[1] > bits[0];
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    lines = contents.toString().split('\n');
    let gammaVal = [], epsilonVal = [];
    for (let i = 0; i < 12; i++) {
        gammaVal[i] = +findCommonBit(i);
        epsilonVal[i] = +(!findCommonBit(i));
    }
    console.log(parseInt(gammaVal.join(""), 2) * parseInt(epsilonVal.join(""), 2));
}
main();
