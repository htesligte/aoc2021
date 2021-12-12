const fs = require('fs/promises');

const caves = {};

let singleSmallCaveName = "";

const canIVisit = (cave, parents) => {
    if (cave.name === "start") {
        return false;
    }
    if (cave.isLarge) {
        return true;
    }
    if (cave.name === singleSmallCaveName) {
        return parents.filter(c => c.name === cave.name).length < 2;
    }
    return parents.find(p => p.name === cave.name) === undefined;
}

const findRoutes2 = (cave, parents) => {
    const routesToEnd = [];
    for (const connection of cave.connections) {
        if (connection.name === "end") {
            routesToEnd.push([cave, connection]);
        } else if (canIVisit(connection, parents)) {
            const foundRoutes = findRoutes2(connection, parents.concat([cave]));
            for (const route of foundRoutes) {
                routesToEnd.push([cave].concat(route));
            }
        }
    }
    return routesToEnd;
}

const debugRoutes = (routes) => {
    const strs = routes.map(r => {
        const names = r.map(c => c.name);
        return names.join(",");
    });
    strs.sort();
    console.log(strs);
    /*for (const route of routes) {
        for (const cave of route) {
            process.stdout.write(cave.name + ",");    
        }
        process.stdout.write("\n");
    }*/
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    for (const line of lines) {
        const [cave1, cave2] = line.split("-");
        
        if (!caves[cave1]) {
            caves[cave1] = {name: cave1, isLarge: cave1.toUpperCase() === cave1, connections: [], isStart: cave1 === "start", isEnd: cave1 === "end"};
        }
        if (!caves[cave2]) {
            caves[cave2] = {name: cave2, isLarge: cave2.toUpperCase() === cave2, connections: [], isStart: cave2 === "start", isEnd: cave2 === "end"};
        }
        caves[cave1].connections.push(caves[cave2]);
        caves[cave2].connections.push(caves[cave1]);
    }

    let allRoutes = [];

    const smallCaveNames = Object.keys(caves).filter(name => !caves[name].isLarge);
    for (const smallCaveName of smallCaveNames) {
        singleSmallCaveName = smallCaveName;
        allRoutes = allRoutes.concat(findRoutes2(caves["start"], []));
    }
    // now filter duplicates
    const strs = allRoutes.map(r => {
        const names = r.map(c => c.name);
        return names.join(",");
    });
    strs.sort();
    const uniqRoutes = [];
    for (const routeStr of strs) {
        if (!uniqRoutes.includes(routeStr)) {
            uniqRoutes.push(routeStr);
        }
    }


    //const routes = findRoutes2(caves["start"], []);
    //debugRoutes(routes);
    console.log(uniqRoutes.length);
}
main();
