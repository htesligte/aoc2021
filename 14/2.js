const fs = require('fs/promises');
let initStr = "";
const piRules = {};
const maxDepth = 40;
const cache = {};

mergeInto = (o1, o2) => {
    for (const key of Object.keys(o2)) {
        if (o1[key]) {
            o1[key] += o2[key];
        } else {
            o1[key] = o2[key];
        }
    }
}

const getNewStr2 = (charA, charC, depth) => {
    if (cache[`${charA}-${charC}-${depth}`]) {
        return cache[`${charA}-${charC}-${depth}`];
    }

    const charB = piRules[`${charA}${charC}`];
    if (!charB) {
        return {};
    }
    const counter = {[charB]: 1};
    if (depth === 1) {
        if (counter[charA]) {
            counter[charA]++;
        } else {
            counter[charA] = 1;
        }
    }

    if (depth < maxDepth) {
        // we need two outcomes: what is between charA and charB 
        // and what is between charB and charC
        mergeInto(counter, getNewStr2(charA, charB, depth+1));
        mergeInto(counter, getNewStr2(charB, charC, depth+1));
        //return outcome1 + charB + outcome2;
    }
    cache[`${charA}-${charC}-${depth}`] = counter;
    return counter;
}


const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    initStr = lines[0];

    for (let i = 1; i < lines.length; i++) {
        const search = lines[i][0] + lines[i][1];
        const insert = lines[i][6];
        piRules[search] = insert;
    }

    const obj = {[initStr[initStr.length-1]]: 1};

    
    for (let i = 0; i < initStr.length-1; i++) {
        mergeInto(obj, getNewStr2(initStr[i], initStr[i+1], 1));
    }

    
    let mostCommon = 0;
    let leastCommon = -1;
    for (const key of Object.keys(obj)) {
        if (obj[key] > mostCommon) {
            mostCommon = obj[key];
        }
        if (leastCommon === -1 || obj[key] < leastCommon) {
            leastCommon = obj[key];
        }
    }    
    console.log(mostCommon - leastCommon);
    //console.log(counters);

}
main();
