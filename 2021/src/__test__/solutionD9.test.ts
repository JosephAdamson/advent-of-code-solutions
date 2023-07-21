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

test("part one test", () => {
    const expected = 15;
    const actual = partOne(data);
    expect(actual).toBe(expected);
});

test("part two test", () => {
    const expected = 1134;
    const actual = partTwo(data);
    expect(actual).toBe(expected);
})