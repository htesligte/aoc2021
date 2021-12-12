const fs = require('fs/promises');

const caves = {};

class Route {
    constructor() {
        this.caves = [];
    }
}

const canIConnect = (cave1, cave2) => {
    for (const connection of cave1.connections) {
        if (connection.name === cave2.name) {
            return true;
        }
        if (connection.isLarge) {
            return canIConnect(connection, cave2);
        }
    }
    return false;
}

const printRoutes = (routes, isRoot) => {
    if (isRoot) {
        process.stdout.write("start,")
    }
    for (const route of routes) {
        if (Array.isArray(route)) {
            printRoutes(route, false);
        }
        else {
            process.stdout.write("," + route.name);
        }
        if (isRoot) {
            process.stdout.write(",end\n");
        }
    }
}

isCaveInRoutes = (cave, routes) => {
    for (const route of routes) {
        if (Array.isArray(route) && isCaveInRoutes(cave, route)) {
            return true;
        } else {
            return route.find((routeCave) => cave.name === routeCave.name).length > 0;
        }
    }
    return false;
}



const findRoutes2 = (cave, parents) => {
    const routesToEnd = [];
    for (const connection of cave.connections) {
        if (connection.name === "end") {
            routesToEnd.push([cave, connection]);
        }
        else if (connection.isLarge || parents.find(p => p.name === connection.name) === undefined) {
            const foundRoutes = findRoutes2(connection, parents.concat([cave]));
            for (const route of foundRoutes) {
                routesToEnd.push([cave].concat(route));
            }
        }
    }
    return routesToEnd;
}



















































































const debugRoutes = (routes) => {
    for (const route of routes) {
        for (const cave of route) {
            process.stdout.write(cave.name + ",");    
        }
        process.stdout.write("\n");
    }
}




const findRoutes = (currentCave, currentRoutes) => {
    const routes = [];
    for (const connection of currentCave.connections) {
        if (connection.name === "end") {
            routes.push([currentCave, connection]);
        } else if (!connection.isLarge && isCaveInRoutes(connection, currentRoutes)) {
            routes.push(findRoutes(currentCave, currentRoutes.map(r => r.concat([currentCave]))));
        }
    }
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
    const routes = findRoutes2(caves["start"], []);
    //printRoutes(routes, true);
    const y = 10;
    //console.log(routes);
    //debugRoutes(routes);
    console.log(routes.length);
}
main();
