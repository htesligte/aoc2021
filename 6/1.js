const fs = require('fs/promises');
const main = async () => {
    const contents = await fs.readFile('input.txt');
    let fishes = contents.toString().split(',').map((f) => parseInt(f));

    for (let i = 0; i < 256; i++) {
        let fishCount = fishes.length;
        for (let x = 0; x < fishCount; x++) {
            fishes[x]--;
            if (fishes[x] < 0) {
                fishes[x] = 6;
                fishes.push(8);
            }
        }
    }
    console.log(fishes.length);

}
main();
