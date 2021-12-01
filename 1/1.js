const fs = require('fs/promises');
const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n');
    let prev = 0, inc = 0;
    for (const line of lines) {
        const cur = parseInt(line);
        if (cur > prev) {
            inc++;
        }
        prev = cur;
    }
    console.log(inc-1);
}
main();
