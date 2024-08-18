import { partOne } from "../DAY_15/solutionD15";
import { processData2DIntArr } from "../utils";
import { resolve } from "path";
const PATH = resolve("src/__test__/input_D15.txt");

const caveGraph: number[][] = processData2DIntArr(PATH);

test("part one test", () => {
    const expected = 40;
    const actual = partOne(caveGraph)
    expect(actual).toBe(expected);
});