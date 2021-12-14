const fs = require('fs/promises');
let currentStr = "";
//let newStr = "";
const piRules = {};
const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    currentStr = lines[0];

    for (let i = 1; i < lines.length; i++) {
        const search = lines[i][0] + lines[i][1];
        const insert = lines[i][6];
        piRules[search] = insert;
    }

    for (let i = 0; i < 10; i++) {
        let newStr = "";
        for (let x = 0; x < currentStr.length; x++) {
            newStr += currentStr[x];
            const compareStr = (currentStr[x] + currentStr[x+1]); 
            if (piRules[compareStr]) {
                newStr += piRules[compareStr];
            }
        }
        currentStr = newStr;
        newStr = "";
    }
    const counts = {};
    for (let x = 0; x < currentStr.length; x++) {
        if (counts[currentStr[x]]) {
            counts[currentStr[x]]++;
        } else {
            counts[currentStr[x]] = 1;
        }
    }
    let mostCommon = 0;
    let leastCommon = -1;
    for (const key of Object.keys(counts)) {
        if (counts[key] > mostCommon) {
            mostCommon = counts[key];
        }
        if (leastCommon === -1 || counts[key] < leastCommon) {
            leastCommon = counts[key];
        }
    }    
    console.log(mostCommon - leastCommon);

}
main();
