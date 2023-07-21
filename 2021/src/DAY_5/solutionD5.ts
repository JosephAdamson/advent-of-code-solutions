import { readFileSync } from "fs";
import { resolve } from "path";
import { drawMatrix } from "../utils";

const PATH = resolve(__dirname, "input_D5.txt");

const vectors: string[][] = [];

// create line array
const lines: number[][] = [];
for (let i = 0; i < 1000; i++) {
    lines.push(Array(1000).fill(0));
}

function processInput(path: string) {
    try {
        const data = readFileSync(path, "utf-8");
        const lines = data.split("\n");
        for (let line of lines) {
            vectors.push(line.split(" -> "));
        }
    } catch (error) {
        console.log(error);
    }
}
processInput(PATH);

/* 
--- Day 5: Hydrothermal Venture ---
You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....
In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

Ideas:
- Represent vertical/horizontal space and matrix of maxX * maxY
- Process each line/direction/vector into a single range
    e.g. 
    • (x1, y1) -> (x2, y2) where (0, 9) -> (5, 9)
    • y1 === y2 therefore vertical line
    • range = [x1..x2], increment values @ row x1..x2, y1
*/
function sumIntersectingLines(lines: number[][]) {
    return lines
        .flat()
        .reduce((acc = 0, curr) => {
            if (curr > 1) {
                acc += 1;
            }
            return acc;
        }, 0);
}


function computeHorizontalLines(x1: number, y1: number, x2: number, y2: number, lines: number[][]) {
    if (x1 === x2) {
        let y = y1 < y2 ? y1 : y2;
        let upper = y2 > y1 ? y2 : y1;
        let x = x1;
        while (y <= upper) {
            lines[y][x]++;
            y++;
        }
    }
}


function computeVerticalLines(x1: number, y1: number, x2: number, y2: number, lines: number[][]) {
    if (y1 === y2) {
        let x = x1 < x2 ? x1 : x2;
        let upper = x2 > x1 ? x2 : x1;
        let y = y1;
        while (x <= upper) {
            lines[y][x]++;
            x++;
        }
    }
}


function computeDiagonalLines(x1: number, y1: number, x2: number, y2: number, lines: number[][]) {
    if (x1 !== x2 && y1 !== y2) {
        let x;
        let y;
        let xUpper;
        let yRange;

        // sort vector coord by x coord
        if (x1 < x2) {
            x = x1;
            y = y1;
            xUpper = x2;
            yRange = y2;
        } else {
            x = x2;
            y = y2;
            xUpper = x1;
            yRange = y1;
        }
        //console.log(`vector OG: ${x1}, ${y1} -> ${x2}, ${y2}`)
        //console.log(`${x}, ${y} -> ${xUpper}, ${yRange}`);
        while (x <= xUpper) {
            lines[y][x]++;
            x++;
            if (y > yRange) {
                y--;
            } else {
                y++;
            }
        }
    }
}


function partOne(vectors: string[][], lines: number[][]) {
    // - loop over each vector
    // - process vector
    // - find out which case (horizontal or vertical)
    // - row (x pos), col (y pos)
    // - loop over according to case
    // O(total range of each vector)
    for (let vector of vectors) {
        const [x1, y1] = vector[0].split(",")
            .map(point => parseInt(point));
        const [x2, y2] = vector[1].split(",")
            .map(point => parseInt(point));
        //console.log(`x1 ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`);
        computeVerticalLines(x1, y1, x2, y2, lines);
        computeHorizontalLines(x1, y1, x2, y2, lines);
    }
    return sumIntersectingLines(lines);
}
//console.log(partOne(vectors, lines));

/*
--- Part Two ---
Unfortunately, considering only horizontal and vertical lines doesn't give you the full picture; you need to also consider diagonal lines.

Because of the limits of the hydrothermal vent mapping system, the lines in your list will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:

An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
Considering all lines from the above example would now produce the following diagram:

1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....
You still need to determine the number of points where at least two lines overlap. In the above example, this is still anywhere in the diagram with a 2 or larger - now a total of 12 points.

Consider all of the lines. At how many points do at least two lines 
*/
function partTwo(vectors: string[][], lines: number[][]) {

    for (let vector of vectors) {
        const [x1, y1] = vector[0].split(",")
            .map(point => parseInt(point));
        const [x2, y2] = vector[1].split(",")
            .map(point => parseInt(point));;

        computeVerticalLines(x1, y1, x2, y2, lines);
        computeHorizontalLines(x1, y1, x2, y2, lines);
        computeDiagonalLines(x1, y1, x2, y2, lines);
    }
    return sumIntersectingLines(lines);
}
console.log(partTwo(vectors, lines));

export {
    partOne,
    partTwo,
}