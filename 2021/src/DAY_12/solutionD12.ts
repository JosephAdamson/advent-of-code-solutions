import { readFileSync } from "fs";
import { resolve } from "path";
import { readInDataStr } from "../utils";

const PATH = resolve("src/DAY_12/input_D12.txt");
const data: string[] | undefined = readInDataStr(PATH);
/* 
--- Day 12: Passage Pathing ---
With your submarine's subterranean subsystems subsisting suboptimally, the only way you're getting out of 
this cave anytime soon is by finding a path yourself. Not just a path - the only way to know if you've found 
the best path is to find all of them.

Fortunately, the sensors are still mostly working, and so you build a rough map of the remaining caves 
(your puzzle input). For example:

start-A
start-b
A-c
A-b
b-d
A-end
b-end
This is a list of how all of the caves are connected. You start in the cave named start, and your destination 
is the cave named end. An entry like b-d means that cave b is connected to cave d - that is, you can move 
between them.

So, the above cave system looks roughly like this:

    start
    /   \
c--A-----b--d
    \   /
     end
Your goal is to find the number of distinct paths that start at start, end at end, and don't visit small caves 
more than once. There are two types of caves: big caves (written in uppercase, like A) and small caves (written 
in lowercase, like b). It would be a waste of time to visit any small cave more than once, but big caves are 
large enough that it might be worth visiting them multiple times. So, all paths you find should visit small 
caves at most once, and can visit big caves any number of times.

Given these rules, there are 10 paths through this example cave system:

start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end
(Each line in the above list corresponds to a single path; the caves visited by that path are listed in the 
order they are visited and separated by commas.)

Note that in this cave system, cave d is never visited by any path: to do so, cave b would need to be visited 
twice (once on the way to cave d and a second time when returning from cave d), and since cave b is small, 
this is not allowed.

Here is a slightly larger example:

dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
The 19 paths through it are as follows:

start,HN,dc,HN,end
start,HN,dc,HN,kj,HN,end
start,HN,dc,end
start,HN,dc,kj,HN,end
start,HN,end
start,HN,kj,HN,dc,HN,end
start,HN,kj,HN,dc,end
start,HN,kj,HN,end
start,HN,kj,dc,HN,end
start,HN,kj,dc,end
start,dc,HN,end
start,dc,HN,kj,HN,end
start,dc,end
start,dc,kj,HN,end
start,kj,HN,dc,HN,end
start,kj,HN,dc,end
start,kj,HN,end
start,kj,dc,HN,end
start,kj,dc,end
Finally, this even larger example has 226 paths through it:

fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
How many paths through this cave system are there that visit small caves at most once?

Thoughts:

    - Represent cave connections as an unweighted directed (?)
    graph and traverse it using a modified DFS]

    - first class function idea to filter node neighbours came from reddit

*/
class Graph {
    private _adjacencyLists: Map<string, string[]> = new Map();

    populate(data: string[] | undefined) {
        if (data) {
            for (let relation of data) {
                const [cave, neighbour] = relation.split("-");
                const a: string[] | undefined = this._adjacencyLists.get(cave);
                const b: string[] | undefined = this._adjacencyLists.get(neighbour)

                a ? this._adjacencyLists.set(cave, [...a, neighbour]) :
                    this._adjacencyLists.set(cave, [neighbour]);

                b ? this._adjacencyLists.set(neighbour, [...b, cave]) :
                    this._adjacencyLists.set(neighbour, [cave]);
            }
        } else {
            throw Error("Cannot populate, data is null");
        }
    }

    get adjacencyLists() {
        return this._adjacencyLists;
    }
}


function dfs(state: Graph, 
    currPath: string[], 
    currCave: string, 
    paths: string[], 
    neighbourFilter: (neighbours: string[], currPath: string[]) => string[]) {

    if (currCave === "end") {
        paths.push(currPath.join(",") + ",end");
        return;
    }

    // console.log(`curr cave ${currCave}`);
    let neighbours = state.adjacencyLists.get(currCave);
    if (neighbours) {
        //console.log(`curr path ${currPath}`);
        currPath.push(currCave);

        neighbours = neighbourFilter(neighbours, currPath);

        for (let neighbour of neighbours) {
            if (neighbour !== "start") {
                dfs(state, currPath, neighbour, paths, neighbourFilter);
            }
        }
        currPath.pop();
    }
}


function isLowerCase(token: string) {
    return token.toLowerCase() === token;
}


function smallCaveSinglePass(neighbours: string[], currPath: string[]) {
    return neighbours.filter(neighbour => {
        if (!isLowerCase(neighbour)) {
            return neighbour;
        } else {
            if (!currPath.includes(neighbour)) {
                return neighbour;
            }
        }
    });
}

function partOne(data: string[] | undefined) {
    if (data) {
        const state = new Graph();
        state.populate(data);
        //console.log(state);
        const paths: string[] = [];
        dfs(state, [], "start", paths, smallCaveSinglePass);
        return paths.length;
    }
}
//console.log(partOne(data));

/*
--- Part Two ---
After reviewing the available paths, you realize you might have time to visit a single small cave twice. 
Specifically, big caves can be visited any number of times, a single small cave can be visited at most twice, 
and the remaining small caves can be visited at most once. However, the caves named start and end can only be 
visited exactly once each: once you leave the start cave, you may not return to it, and once you reach the end 
cave, the path must end immediately.

Now, the 36 possible paths through the first example above are:

start,A,b,A,b,A,c,A,end
start,A,b,A,b,A,end
start,A,b,A,b,end
start,A,b,A,c,A,b,A,end
start,A,b,A,c,A,b,end
start,A,b,A,c,A,c,A,end
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,d,b,A,c,A,end
start,A,b,d,b,A,end
start,A,b,d,b,end
start,A,b,end
start,A,c,A,b,A,b,A,end
start,A,c,A,b,A,b,end
start,A,c,A,b,A,c,A,end
start,A,c,A,b,A,end
start,A,c,A,b,d,b,A,end
start,A,c,A,b,d,b,end
start,A,c,A,b,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,A,c,A,c,A,end
start,A,c,A,end
start,A,end
start,b,A,b,A,c,A,end
start,b,A,b,A,end
start,b,A,b,end
start,b,A,c,A,b,A,end
start,b,A,c,A,b,end
start,b,A,c,A,c,A,end
start,b,A,c,A,end
start,b,A,end
start,b,d,b,A,c,A,end
start,b,d,b,A,end
start,b,d,b,end
start,b,end
The slightly larger example above now has 103 paths through it, and the even larger example now has 3509 paths through it.

Given these new rules, how many paths through this cave system are there?
*/
function smallCaveDoublePass(neighbours: string[], currPath: string[]) {
    const currPathFreq = new Map();
    currPath.forEach(cave => {
        if (isLowerCase(cave)) {
            const freq = currPathFreq.get(cave);
            if (freq) {
                currPathFreq.set(cave, freq + 1);
            } else {
                currPathFreq.set(cave, 1);
            }
        }
    });

    const allowed = neighbours.filter(neighbour => {
        if (!isLowerCase(neighbour)) {
            return neighbour;
        } else {
            if (Array.from(currPathFreq.values()).includes(2)) {
                if (!currPath.includes(neighbour)) {
                    return neighbour;
                }
            } else {
                const neighbourFreq = currPathFreq.get(neighbour);
                if (!neighbourFreq || neighbourFreq < 2) {
                    return neighbour;
                }
            }
        }
    });
    return allowed;
}


function partTwo(data: string[] | undefined) {
    if (data) {
        const state = new Graph();
        state.populate(data);
        const paths: string[] = [];
        dfs(state, [], "start", paths, smallCaveDoublePass);
        return paths.length;
    }
}
//console.log(partTwo(data));


export {
    partOne,
    partTwo,
    Graph
}