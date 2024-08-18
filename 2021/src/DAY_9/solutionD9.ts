import { readFileSync } from "fs";
import { resolve } from "path";
import { padMatrix, processData2DIntArr } from "../utils";


const PATH = resolve("src/DAY_9/input_D9.txt");

// handle edge cases, rather than use a buch of if statments to address each case
// we create a padded copy of the original array and iterate over that.
// even better we can pad with 9s that we can ignore. This may use a bit more memory 
// than the more comprenhesive solution where we handle every edge case BUT its a
// good way to generic way to handle this problem.
const data: number[][] | undefined = processData2DIntArr(PATH);

/*
--- Day 9: Smoke Basin ---
These caves seem to be lava tubes. Parts are even still volcanically active; small hydrothermal vents release 
smoke into the caves that slowly settles like rain.

If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer.
The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).

Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:

2199943210
3987894921
9856789892
8767896789
9899965678
Each number corresponds to the height of a particular location, where 9 is the highest and 0 is the lowest 
a location can be.

Your first goal is to find the low points - the locations that are lower than any of its adjacent locations. 
Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of 
the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)

In the above example, there are four low points, all highlighted: two are in the first row (a 1 and a 0), 
one is in the third row (a 5), and one is in the bottom row (also a 5). All other locations on the heightmap 
have some lower adjacent location, and so are not low points.

The risk level of a low point is 1 plus its height. In the above example, the risk levels of the low points 
are 2, 1, 6, and 6. The sum of the risk levels of all low points in the heightmap is therefore 15.

Find all of the low points on your heightmap. What is the sum of the risk levels of all low points on your 
heightmap? 

Thoughts:

Model the data as a 2d array and traverse in linearly O(n) checking the neighbours for each element:
- in most cases we check the current value against its top, bottom, left and right neighbours.
- There are two edge cases:
    • edge elements: data[0][k], data[k][0], data[k][m - 1], data[n - 1][k]
    • corner elements (a subset of the first edge case): data[0][0], 
        data[0][m - 1], data[n - 1][0], data[n - 1][m - 1]

*/
function getLowPointCoords(data: number[][]) {
    const n = data.length;
    const m = data[0].length;

    const coords: number[][] = [];

    for (let i = 1; i < n - 1; i++) {
        for (let j = 1; j < m - 1; j++) {
            //console.log(paddedData[i][j]);
            
            const currVal = data[i][j];

            if (currVal === 9) { continue; }

            if (data[i - 1][j] > currVal && // top
                data[i + 1][j] > currVal && // bottom
                data[i][j - 1] > currVal && // left
                data[i][j + 1] > currVal) { // right
                coords.push([i, j]);
            }

            // How I previously handled the edge cases
            // if (i === 0 || j === 0 || i === n - 1 || j === m - 1) {
            //     // top row
            //     if (i === 0) {
            //         if (j === 0) {
            //             if (data[i][j + 1] > currVal && data[i + 1][j] > currVal) {
            //                 coords.push([i, j]);
            //             }
            //         } else if (j === m - 1) {
            //             if (data[i][j - 1] > currVal && data[i + 1][j] > currVal) {
            //                 coords.push([i, j]);
            //             }
            //         } else {
            //             if (data[i][j - 1] > currVal &&
            //                 data[i][j + 1] > currVal &&
            //                 data[i + 1][j] > currVal) {
            //                 coords.push([i, j]);
            //             }
            //         }
            //     }

            //     // bottom row
            //     if (i === n - 1) {
            //         if (j == 0) {
            //             if (data[i][j + 1] > currVal && data[i - 1][j] > currVal) {
            //                 coords.push([i, j]);
            //             }
            //         } else if (j === m - 1) {
            //             if (data[i][j - 1] > currVal && data[i - 1][j] > currVal) {
            //                 coords.push([i, j]);
            //             }
            //         } else {
            //             if (data[i][j - 1] > currVal &&
            //                 data[i][j + 1] > currVal &&
            //                 data[i - 1][j] > currVal) {
            //                 coords.push([i, j]);
            //             }
            //         }
            //     }

            //     // left side
            //     if (i !== 0 && i !== n - 1 && j === 0) {
            //         if (data[i - 1][j] > currVal &&
            //             data[i][j + 1] > currVal &&
            //             data[i + 1][j] > currVal) {
            //             coords.push([i, j]);
            //         }
            //     }

            //     // right side
            //     if (i !== 0 && i !== n - 1 && j === m - 1) {
            //         if (data[i - 1][j] > currVal &&
            //             data[i][j - 1] > currVal &&
            //             data[i + 1][j] > currVal) {
            //             coords.push([i, j]);
            //         }
            //     }
            // } else {
            //     if (data[i][j - 1] > currVal &&
            //         data[i - 1][j] > currVal &&
            //         data[i][j + 1] > currVal &&
            //         data[i + 1][j] > currVal) {
            //         coords.push([i, j]);
            //     }
            // }

        }
    }
    return coords;
}


function partOne(data: number[][] | undefined) {
    if (data) {
        const paddedData = padMatrix(data, 9);
        const coords = getLowPointCoords(paddedData);
        let riskLevel = 0;
        for (let coord of coords) {
            let [i, j] = coord;
            riskLevel = riskLevel + paddedData[i][j] + 1;
        }
        return riskLevel;
    }
}
// console.log(partOne(data));

/*
--- Part Two ---
Next, you need to find the largest basins so you know what areas are most important to avoid.

A basin is all locations that eventually flow downward to a single low point. Therefore, 
every low point has a basin, although some basins are very small. Locations of height 9 do not count 
as being in any basin, and all other locations will always be part of exactly one basin.

The size of a basin is the number of locations within the basin, including the low point. 
The example above has four basins.

The top-left basin, size 3:

2199943210
3987894921
9856789892
8767896789
9899965678
The top-right basin, size 9:

2199943210
3987894921
9856789892
8767896789
9899965678
The middle basin, size 14:

2199943210
3987894921
9856789892
8767896789
9899965678
The bottom-right basin, size 9:

2199943210
3987894921
9856789892
8767896789
9899965678
Find the three largest basins and multiply their sizes together. In the above example, this is 9 * 14 * 9 = 1134.

What do you get if you multiply together the sizes of the three largest basins? 

Thoughts:
    get coords for low points and search around each point recursively to get the size of each basin
*/
function partTwo(data: number[][] | undefined) {
    if (data) {
        const n = data.length;
        const m = data[0].length;
        const paddedData = padMatrix(data, 9);
        const coords = getLowPointCoords(paddedData);

        let basinSizes: number[] = [];
        for (let coord of coords) {
            const [i, j] = coord;
            // console.log(`point: ${i}, ${j}`);
            const points: number[] = [];
            const d = [...data];
            sweepBasin(i, j, d, n, m, points);
            basinSizes.push(points.length);
        }
        basinSizes.sort((a, b) => b - a);
        return basinSizes[0] * basinSizes[1] * basinSizes[2];
    }
}

//console.log(partTwo(data));

// Helper function to sweep the area around each low point and find the size of its
// surrounding basin.
function sweepBasin(i: number, j: number, data: number[][], n: number, m: number, points: number[]) {
    // base case
    if (i < 0 || i === n || j < 0 || j === m || data[i][j] === 9) {
        return;
    }

    points.push(data[i][j]);
    // mark as visited
    data[i][j] = 9;
    sweepBasin(i + 1, j, data, n, m, points);
    sweepBasin(i, j - 1, data, n, m, points);
    sweepBasin(i - 1, j, data, n, m, points);
    sweepBasin(i, j + 1, data, n, m, points);
}

export {
    partOne, 
    partTwo
}