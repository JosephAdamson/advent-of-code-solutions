import { partOne, partTwo } from "../DAY_12/solutionD12";

const dataOne = [
    "start-A",
    "start-b",
    "A-c",
    "A-b",
    "b-d",
    "A-end",
    "b-end"
];

const dataTwo = [
    "dc-end",
    "HN-start",
    "start-kj",
    "dc-start",
    "dc-HN",
    "LN-dc",
    "HN-end",
    "kj-sa",
    "kj-HN",
    "kj-dc"
];

const dataThree = [
    "fs-end",
    "he-DX",
    "fs-he",
    "start-DX",
    "pj-DX",
    "end-zg",
    "zg-sl",
    "zg-pj",
    "pj-he",
    "RW-he",
    "fs-DX",
    "pj-RW",
    "zg-RW",
    "start-pj",
    "he-WI",
    "zg-he",
    "pj-fs",
    "start-RW"
]

test("Part one test one", () => {
    const expected = 10;
    const actual = partOne(dataOne);
    expect(actual).toBe(expected);
});

test("Part one test two", () => {
    const expected = 19;
    const actual = partOne(dataTwo);
    expect(actual).toBe(expected);
});

test("Part one test three", () => {
    const expected = 226;
    const actual = partOne(dataThree);
    expect(actual).toBe(expected);
});

test("Part two test one", () => {
    const expected = 36;
    const actual = partTwo(dataOne);
    expect(actual).toBe(expected);
});

test("Part two test two", () => {
    const expected = 103;
    const actual = partTwo(dataTwo);
    expect(actual).toBe(expected);
});

test("Part two test three", () => {
    const expected = 3509;
    const actual = partTwo(dataThree);
    expect(actual).toBe(expected);
});