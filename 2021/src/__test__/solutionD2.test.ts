import { partOne, partTwo } from "../DAY_2/solutionD2";

const data = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2"
];


test("part on test example", () => {
    const expected = 150;
    const actual = partOne(data);
    expect(actual).toBe(expected);
});

test("part two example", () => {
    const expected = 900;
    const actual = partTwo(data);
    expect(actual).toBe(expected);
})