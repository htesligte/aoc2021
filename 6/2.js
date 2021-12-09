const fs = require('fs/promises');

let cache = {};
let totalCache = {};
let processedDepth = [];
let totalChildren = 0;
const getCycli = (days, start, newBorn) => {
    if (cache[days] && cache[days][start]) {
        return cache[days][start];
    } else if (!cache[days]) {
        cache[days] = {};
    }
    const cycles = [];
    for (let day = (days-start); day > 0; day-=7) {
        if (newBorn && day === (days-start)) {
            continue;
        }
        cycles.push(day);
    }
    
    cache[days][start] = cycles;
    return cycles;
}

const countOffspring = (days, start, newBorn) => {
    const cycles = getCycli(days, start, newBorn);
    totalChildren += cycles.length;
    for (const cycle of cycles) {
        countOffspring(cycle, 2, true);
    }
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    let fishes = contents.toString().split(',').map((f) => parseInt(f));
    total = fishes.length;
    for (fish of fishes) {
        if (totalCache[fish]) {
            total += totalCache[fish];
        } else {
            console.log("Calculating", fish);
            totalChildren = 0;
            countOffspring(256, fish, false, 0);
            totalCache[fish] = totalChildren;
            total += totalChildren;
        }
        
    }
    
    
    console.log(total);

}
main();
