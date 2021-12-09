const fs = require('fs/promises');

let minDistance = 0;

const getDistance = (start, end) => {
    const diff = Math.abs(start-end);
    return (diff*(diff+1))/2;
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    let values = (contents.toString().split(',')).map(v => parseInt(v));
    values.sort(function(a, b){return a-b});
    values = values.reverse();
    
    for (let i = 0; i < values[0]; i++) {
        let curDistance =0;
        for (const v of values) {
            curDistance += getDistance(v, i);
            if (minDistance > 0 && curDistance > minDistance) {
                break;
            }
        }
        if (curDistance < minDistance || minDistance === 0) {
            minDistance = curDistance;
        }
    }
    console.log(minDistance);
}
main();
