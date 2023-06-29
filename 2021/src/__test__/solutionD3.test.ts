import { partTwoHelper, Criteria } from "../DAY_3/solutionD3";

const data: string[] = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
]


test("verify test cases from advent of code", () => {
    const expected = 23;
    const actual = parseInt(partTwoHelper(data, Criteria.OXYGEN)[0], 2);
    expect(actual).toBe(expected);
})