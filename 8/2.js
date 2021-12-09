const fs = require('fs/promises');
/*
 aaaa 
b    c
b    c
 dddd 
e    f
e    f
 gggg 
*/

const lengthCandidates = {
    6: [0,6,9],
    2: [1],
    3: [7],
    4: [4],
    5: [2,3,5]
};

const numberCharMapping = {
    0: ['a', 'b', 'e', 'f', 'g', 'c'],
    1: ['c', 'f'],
    2: ['a', 'c', 'd', 'e', 'g'],
    3: ['a', 'c', 'd', 'f', 'g'],
    4: ['b', 'd', 'c', 'f'],
    5: ['a', 'b', 'd', 'e', 'g'],
    6: ['a', 'b', 'd', 'e', 'g', 'f'],
    7: ['a', 'c', 'f'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'd', 'c', 'f', 'g']
}

const merge = (arrays) => {
    const retVal = [];

    for (const array of arrays) {
        for (const v of array) {
            if (!retVal.includes(v)) {
                retVal.push(v);
            }
        }
    }
    return retVal;
}

const getSharedLeds = (numbers) => {
    const arrays = [];
    for (const number of numbers) {
        arrays.push(numberCharMapping[number]);
    }
    return merge(arrays);
}

const deduceCandidates = (chars, charCandidates) => {
    const potentials = lengthCandidates[chars.length];
    for (const c of chars.split('')) {
        const sharedLeds = getSharedLeds(potentials);
        
    }
}


const run = (signals) => {
    const charCandidates = {
        a: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        b: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        c: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        d: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        e: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        f: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        g: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    }

    // first, identify all the candidates for each of the signals
    const signalsCandidates = {};
    for (signal of signals) {
        signalsCandidates[signal] = lengthCandidates[signal.length];
    }

    // now that we know for each signal what the candidates are by length
    // we are going to identify


}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    const output = lines.map(line => {
        const [pattern, output] = line.split('|');
        return output.trim().split(' ').concat(pattern.trim().split(' '));
    });
    
    for (const row of output) {
        const set = {2: false, 4: false, 3: false};
        for (const signal of row) {
            set[signal.length] = true;
        }
        if (!(set[2] && set[4] && set[3])) {
            console.log("helaas");
        }
        
    }
}
main();
