#!/usr/bin/env zx
const fs = require('fs');
const directories = fs.readdirSync('.').filter((e) => !isNaN(e));
let newDir = process.argv[3];
if (!newDir) {
    const max = directories.reduce((prev, cur) => parseInt(cur) > parseInt(prev) ? cur : prev, 0);
    newDir = "" + (parseInt(max)+1);
}

await $`mkdir -p ${newDir}/.vscode`;
const launchJson = {
    version: "0.2.0",
    configurations: [
        {
            type: "pwa-node",
            request: "launch",
            name: "1",
            skipFiles: [
                "<node_internals>/**"
            ],
            program: "${workspaceFolder}/1.js"
        },
        {
            type: "pwa-node",
            request: "launch",
            name: "2",
            skipFiles: [
                "<node_internals>/**"
            ],
            program: "${workspaceFolder}/2.js"
        }
    ]
}
fs.writeFileSync(`${newDir}/.vscode/launch.json`, JSON.stringify(launchJson));
const contents = `const fs = require('fs/promises');
const main = async () => {
    const contents = await fs.readFile('sample.txt');
    const lines = contents.toString().split('\\n').filter((line) => line.length > 0);

}
main();
`;
fs.writeFileSync(`${newDir}/1.js`, contents);
await $`touch ${newDir}/2.js`;
await $`touch ${newDir}/input.txt`;
await $`touch ${newDir}/sample.txt`;
await $`code ${newDir}`;
