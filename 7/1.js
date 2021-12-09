const fs = require('fs/promises');
const main = async () => {
    const contents = await fs.readFile('input.txt');
    const values = contents.toString().split(',').map(v => parseInt(v));
    const median = 328;
    let totalEnergy =0;
    for (const v of values) {
        totalEnergy += Math.abs(v - median);
    }
    console.log(totalEnergy);
}
main();
