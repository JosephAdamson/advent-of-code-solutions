import { resolve } from "path";
import { readFileSync } from "fs";

const PATH = resolve(__dirname, "input_D4.txt");

// store processed data in global variables
let draws: number[] | undefined;
let boards: number[][] = [];

// playing around with the streaming api
function processInput(path: string) {
    // load in all data into memory
    const data = readFileSync(path, "utf-8");
    const sections = data.split("\n");
    // first string is draws
    draws = sections[0]
        .split(",")
        .map(token => parseInt(token));
    // gather up boards
    let board: number[] = [];
    for (let i = 2; i < sections.length; i++) {
        if (sections[i] === "") {
            boards.push(board);
            board = [];
            continue;
        }

        let row: number[] = sections[i]
            .split(" ")
            .map(token => parseInt(token))
            .filter(token => !isNaN(token))
        board.push(...row);
    }
}
processInput(PATH);

/*
--- Day 4: Giant Squid ---
You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see 
any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your 
submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and 
the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all 
numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It 
automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). 
For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as 
follows (shown here adjacent to each other to save space):

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
Finally, 24 is drawn:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
At this point, the third board wins because it has at least one complete row or column of marked numbers 
(in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that 
board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board 
won, 24, to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first. What will your final score 
be if you choose that board? 
*/
function crossOff(board: number[], draw: number) {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === draw) {
            board[i] = -1;
        }
    }
}


function bingoSearch(board: number[]) {
    // row search
    let bingoRow = 0;
    let i = 0;
    while (i < board.length) {
        const row = Math.floor(i / 5);

        if (board[i] < 0) {
            bingoRow++;
        } else {
            bingoRow = 0;
            // knowing that we are using a 5 x 5 grid
            i = (row + 1) * 5;
            continue;
        }

        if (bingoRow === 5) {
            return true;
        }
        i++;
    }

    // col search
    let bingoCol = 0;
    let j = 0;
    while (j < board.length) {
        const row = Math.floor(j / 5);
        const col = j % 5;

        if (board[j] < 0) {
            bingoCol++;
        } else {
            if (col === 4) {
                break;
            }
            bingoCol = 0;
            // knowing that we are using a 5 x 5 grid
            j = col + 1;
            continue;
        }

        if (bingoCol === 5) {
            return true;
        };
        j = (row + 1) * 5 + col;
    }
    return false;
}


function sumBoard(board: number[]) {
    return board
        .filter(value => value >= 0)
        .reduce((acc, curr) => acc += curr)
}


function drawBingo(draws: number[] | undefined, boards: number[][]) {
    // for each draw O(D) we interate through our boards O(B) where each element is 5 * 5 board
    // for O(D * B) (yikes!)
    const scores: number[] = [];
    if (draws) {
        let done: number[] = []
        while (done.length < boards.length) {
            for (let draw of draws) {
                for (let i = 0; i < boards.length; i++) {
                    // iterate through board and check each value against draw
                    // if draw cross off (-1) assume bingo doesn't use negative numbers in this case
                    crossOff(boards[i], draw);
                    if (bingoSearch(boards[i]) && !done.includes(i)) {
                        //console.log(`board ${i} wins with a score of ${sumBoard(boards[i]) * draw}`);
                        scores.push(sumBoard(boards[i]) * draw);
                        done.push(i);
                    };
                }
            }
        }
    }
    return scores;
}


function partOne(draws: number[] | undefined, boards: number[][]) {
    const result = drawBingo(draws, boards);
    return result[0];
}
//console.log(partOne(draws, boards));

/*
--- Part Two ---
On the other hand, it might be wise to try a different strategy: let the giant squid win.

You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its 
arms, the safe thing to do is to figure out which board will win last and choose that one. That way, no matter 
which boards it picks, it will win for sure.

In the above example, the second board is the last to win, which happens after 13 is eventually called and its 
middle column is completely marked. If you were to keep playing until this point, the second board would have a 
sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

Figure out which board will win last. Once it wins, what would its final score be? 
*/
function partTwo(draws: number[] | undefined, boards: number[][]) {
    const result = drawBingo(draws, boards);
    return result[result.length - 1];
}
//console.log(partTwo(draws, boards));


export {
    partOne,
    partTwo,
    crossOff,
    sumBoard,
    bingoSearch
}