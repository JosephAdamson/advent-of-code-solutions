import { partOne, expandGraph, partTwo } from "../DAY_15/solutionD15";
import { processData2DIntArr } from "../utils";
import { resolve } from "path";
const PATH = resolve("src/__test__/input_D15.txt");
const caveGraph: number[][] = processData2DIntArr(PATH);

test("part one test", () => {
    const expected = 40;
    const actual = partOne(caveGraph)
    expect(actual).toBe(expected);
});

test("expand test", () => {
    const expected = processData2DIntArr("src/__test__/input_D15_2.txt");
    const actual = expandGraph(caveGraph, 5);
    for (let i = 0; i < expected.length; i++) {
        for (let j = 0; j < expected[0].length; j++) {
            expect(actual[i][j]).toBe(expected[i][j]);
        }

    }
});

test("part two test", () => {
    const expected = 315;
    const actual = partTwo(caveGraph, 5);
    expect(actual).toBe(expected);
});