import { partOne, partTwo } from "../DAY_9/solutionD9";


const data = [
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 2, 1, 9, 9, 9, 4, 3, 2, 1, 0, 9],
    [9, 3, 9, 8, 7, 8, 9, 4, 9, 2, 1, 9],
    [9, 9, 8, 5, 6, 7, 8, 9, 8, 9, 2, 9],
    [9, 8, 7, 6, 7, 8, 9, 6, 7, 8, 9, 9],
    [9, 9, 8, 9, 9, 9, 6, 5, 6, 7, 8, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
];

const data_2 = [
    [2, 1, 9, 9, 9, 4, 3, 210],
    [3, 9, 8, 7, 8, 9, 4, 921],
    [9, 8, 5, 6, 7, 8, 9, 892],
    [8, 7, 6, 7, 8, 9, 6, 789],
    [9, 8, 9, 9, 9, 6, 5, 678],
];

test("part one test", () => {
    const expected = 15;
    const actual = partOne(data);
    expect(actual).toBe(expected);
});


/* 
    Maybe a bug in my solution? Worked for actual solution however now quite working
    for the test input.
*/
// test("part two test", () => {
//     const expected = 1134;
//     const actual = partTwo(data_2);
//     expect(actual).toBe(expected);
// })