import { partOne, triNum, partTwo } from "../DAY_7/solutionD7";

let crabs: number[] | undefined;

beforeEach(() => {
    crabs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
});

test("part one test with median", () => {
    const expected = 37;
    const actual = partOne(crabs);
    expect(actual).toBe(expected);
});

test("find 10th triangular number", () => {
    const expected = 55;
    const actual = triNum(10);
    expect(actual).toBe(expected);
});

test("part two test", () => {
    const expected = 168;
    const actual = partTwo(crabs);
    expect(actual).toBe(expected);
});