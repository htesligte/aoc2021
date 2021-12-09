const fs = require('fs/promises');
const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    const output = lines.map(line => {
        const [pattern, output] = line.split('|');
        return output.trim().split(' ');
    });
    let answer = 0;
    for (const row of output) {
        for (const signal of row) {
            if (signal.length === 2 || signal.length === 4 || signal.length === 3 || signal.length === 7) {
                answer++;
            }
        }
    }
    console.log(answer);
}
main();
