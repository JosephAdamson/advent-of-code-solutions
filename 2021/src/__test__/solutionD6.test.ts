import { partOne, partTwo } from "../DAY_6/solutionD6";

let school: number[] = []

beforeEach(() => {
    const data: number[] = [3, 4, 3, 1, 2];
    for (let value of data) {
        school.push(value);
    }
});

afterEach(() => {
    school = [];
});

test("part one test", () => {
    const expected = 5934;
    const actual = partOne(school);
    expect(actual).toBe(expected);
});

// test("part two test 80 cycles", () => {
//     const expected = BigInt(5934);
//     const actual = partTwo(school);
//     expect(actual).toBe(expected);
// });

test("part two test 250 cycles", () => {
    const expected = BigInt(26984457539);
    const actual = partTwo(school);
    expect(actual).toBe(expected);
});