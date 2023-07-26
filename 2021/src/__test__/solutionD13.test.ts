import { partOne, partTwo } from "../DAY_13/solutionD13";

const rawState = [
    [".", ".", ".", "#", ".", ".", "#", ".", ".", "#", "."],
    [".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", ".", ".", "#", ".", "#", "#", "."],
    [".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#"],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["#", ".", "#", ".", ".", ".", ".", ".", ".", ".", "."]
];
let state: number[][] = [];

const folds = [
    ["y", "7"], 
    ["x", "5"]
];

beforeEach(() => {
    state = [];
    for (let row = 0; row < rawState.length; row++) {
        state.push(Array(rawState[0].length).fill(0));
    }
    for (let y = 0; y < rawState.length; y++) {
        for (let x = 0; x < rawState[0].length; x++) {
            if (rawState[y][x] === "#") {
                state[y][x] = 1;
            }
        }
    }
});

test("part one test", () => {
    const expected = 17;
    const actual = partOne(state, [folds[0]]);
    expect(actual).toBe(expected);
});

test("part two test", () => {
    partTwo(state, folds);
});