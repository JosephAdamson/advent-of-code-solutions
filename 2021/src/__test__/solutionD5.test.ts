import { partOne, partTwo } from "../DAY_5/solutionD5";

const vectors: string[][] = [
    ["0,9", "5,9"],
    ["8,0", "0,8"],
    ["9,4", "3,4"],
    ["2,2", "2,1"],
    ["7,0", "7,4"],
    ["6,4", "2,0"],
    ["0,9", "2,9"],
    ["3,4", "1,4"],
    ["0,0", "8,8"],
    ["5,5", "8,2"],
];

let lines: number[][] = [];

beforeEach(() => {
    for (let i = 0; i < 10; i++) {
        lines.push(Array(10).fill(0));
    }
});

afterEach(() => {
    lines = [];
})

test("part one test", () => {
    const expected = 5;
    const actual = partOne(vectors, lines);
    expect(actual).toBe(expected);
})

test("finding the horizontals", () => {
    const expected = 12;
    const actual = partTwo(vectors, lines);
    expect(actual).toBe(expected);
});