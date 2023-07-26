import { readFileSync } from "fs";
import { resolve } from "path";

const PATH = resolve(__dirname, "input_D13.txt");
let dots;
let folds;
const state: number[][] = [];

function processInputData(path: string) {
    const rawData = readFileSync(path, "utf-8");
    const [rawDots, rawFolds] = rawData.split(/\n\n/);

    dots = rawDots.split(/\n/)
        .map(coord => {
            let [i, j] = coord.split(",");
            return [parseInt(i), parseInt(j)];
        });
    folds = rawFolds.split(/\n/)
        .map(instruction => {
            let tokens = instruction.split(" ");
            return tokens[tokens.length - 1].split("=");
        });

    // get dimensions of of inital state and plot points;
    let xAxis = 0;
    let yAxis = 0;
    for (let [x, y] of dots) {
        if (x > xAxis) { xAxis = x; }
        if (y > yAxis) { yAxis = y; }
    }
    for (let row = 0; row < yAxis + 1; row++) {
        state.push(Array(xAxis + 1).fill(0));
    }
    for (let [x, y] of dots) {
        state[y][x]++;
    }
}
processInputData(PATH);

/*
--- Day 13: Transparent Origami ---
You reach another volcanically active part of the cave. It would be nice if you could do some kind of thermal 
imaging so you could tell ahead of time which caves are too hot to safely enter.

Fortunately, the submarine seems to be equipped with a thermal camera! When you activate it, you are greeted 
with:

Congratulations on your purchase! To activate this infrared thermal imaging
camera system, please enter the code found on page 1 of the manual.
Apparently, the Elves have never used this feature. To your surprise, you manage to find the manual; as you go
to open it, page 1 falls out. It's a large sheet of transparent paper! The transparent paper is marked with 
random dots and includes instructions on how to fold it up (your puzzle input). For example:

6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
The first section is a list of dots on the transparent paper. 0,0 represents the top-left coordinate. The first 
value, x, increases to the right. The second value, y, increases downward. So, the coordinate 3,0 is to the right
 of 0,0, and the coordinate 0,7 is below 0,0. The coordinates in this example form the following pattern, where 
 # is a dot on the paper and . is an empty, unmarked position:

...#..#..#.
....#......
...........
#..........
...#....#.#
...........
...........
...........
...........
...........
.#....#.##.
....#......
......#...#
#..........
#.#........
Then, there is a list of fold instructions. Each instruction indicates a line on the transparent paper and wants
you to fold the paper up (for horizontal y=... lines) or left (for vertical x=... lines). In this example, the f
irst fold instruction is fold along y=7, which designates the line formed by all of the positions where y is 7 
(marked here with -):

...#..#..#.
....#......
...........
#..........
...#....#.#
...........
...........
-----------
...........
...........
.#....#.##.
....#......
......#...#
#..........
#.#........
Because this is a horizontal line, fold the bottom half up. Some of the dots might end up overlapping after 
the fold is complete, but dots will never appear exactly on a fold line. The result of doing this fold looks 
like this:

#.##..#..#.
#...#......
......#...#
#...#......
.#.#..#.###
...........
...........
Now, only 17 dots are visible.

Notice, for example, the two dots in the bottom left corner before the transparent paper is folded; after the 
fold is complete, those dots appear in the top left corner (at 0,0 and 0,1). Because the paper is transparent, 
the dot just below them in the result (at 0,3) remains visible, as it can be seen through the transparent paper.

Also notice that some dots can end up overlapping; in this case, the dots merge together and become a single dot.

The second fold instruction is fold along x=5, which indicates this line:

#.##.|#..#.
#...#|.....
.....|#...#
#...#|.....
.#.#.|#.###
.....|.....
.....|.....
Because this is a vertical line, fold left:

#####
#...#
#...#
#...#
#####
.....
.....
The instructions made a square!

The transparent paper is pretty big, so for now, focus on just completing the first fold. After the first 
fold in the example above, 17 dots are visible - dots that end up overlapping after the fold is completed 
count as a single dot.

How many dots are visible after completing just the first fold instruction on your transparent paper? 

Thoughts:
    - I've used a number matrix to represent the state of the origami paper because its easier to
    test/see where dots have overlapped.

    - From the output instructions it looks like the area folded upwards will NOT exceed the 
    top area it will overlap

    - remember:
        - y fold we transpose dots to the TOP segment of the fold
        - x fold we transpose dots to the LEFT segement of the fold

*/
function bisectAndTranspose(
    xBound: number,
    yBound: number,
    state: number[][],
    axis: string,
    lineNumber: number) {

    // current line number should NOT exceed our x or y bound, shouldn't need to check?
    if (axis === "y") {
        // iterate below the fold and transpose values to the mirrored side of the matrix
        for (let y = lineNumber + 1; y < yBound; y++) {
            for (let x = 0; x < xBound; x++) {
                const dot = state[y][x];
                if (dot > 0) {
                    state[lineNumber - (y - lineNumber)][x]++;
                }
            }
        }
        return [lineNumber, xBound];
    } else {
        for (let y = 0; y < yBound; y++) {
            for (let x = lineNumber + 1; x < xBound; x++) {
                const dot = state[y][x];
                if (dot > 0) {
                    state[y][lineNumber - (x - lineNumber)]++
                }
            }
        }
        return [yBound, lineNumber ];
    }
}


function partOne(state: number[][] | undefined, folds: string[][] | undefined) {
    // perform one fold and count the values > 0 in the submartix
    if (state && folds) {
        const instruction = folds[0];
        const subMatrixBounds: number[] = bisectAndTranspose(
            state[0].length,
            state.length,
            state,
            instruction[0],
            parseInt(instruction[1])
        );
        let dotCount = 0;
        for (let y = 0; y < subMatrixBounds[0]; y++) {
            for (let x = 0; x < subMatrixBounds[1]; x++) {
                if (state[y][x] > 0) {
                    dotCount++;
                }
            }
        }
        return dotCount;
    }
}
//console.log(partOne(state, folds));

/*
--- Part Two ---
Finish folding the transparent paper according to the instructions. The manual says the code is always eight 
capital letters.

What code do you use to activate the infrared thermal imaging camera system? 
*/
function partTwo(state: number[][] | undefined, folds: string[][] | undefined) {
    if (state && folds) {
        let yAxis = state.length;
        let xAxis = state[0].length;
        for (let [axis, lineNumber] of folds) {
            const subMatrixBounds: number[] = bisectAndTranspose(
                xAxis,
                yAxis,
                state,
                axis,
                parseInt(lineNumber)
            );
            yAxis = subMatrixBounds[0];
            xAxis = subMatrixBounds[1];
            let code = "";
        }
        // draw sub array to view characters
        let code = "";
        for (let y = 0; y < yAxis; y++) {
            let row = ""
            for (let x = 0; x < xAxis; x++) {
                state[y][x] > 0 ?
                    row = row.concat("#") :
                    row = row.concat(" ");
            }
            code = code.concat(row + "\n");
        }
        return code;
    }
}
//console.log(partTwo(state, folds));


export {
    partOne,
    partTwo
}