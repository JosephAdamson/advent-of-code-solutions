import { partOne, partTwo } from "../DAY_1/solutionD1";

const data = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263
]

test("part one example input", () => {
    const expected = 7;
    const actual = partOne(data);
    expect(actual).toBe(expected);
});

test("example two example input", () => {
    const expected = 5;
    const actual = partTwo(data);
    expect(actual).toBe(expected);
})