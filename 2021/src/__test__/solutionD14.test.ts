import { partOne, partTwo } from "../DAY_14/solutionD14";

let templateMap = new Map();
templateMap.set("CH", "B");
templateMap.set("HH", "N");
templateMap.set("CB", "H");
templateMap.set("NH", "C");
templateMap.set("HB", "C");
templateMap.set("HC", "B");
templateMap.set("HN", "C");
templateMap.set("NN", "C");
templateMap.set("BH", "H");
templateMap.set("NC", "B");
templateMap.set("NB", "B");
templateMap.set("BN", "B");
templateMap.set("BB", "N");
templateMap.set("BC", "B");
templateMap.set("CC", "N");
templateMap.set("CN", "C");

let codeData = "NNCB";


test("part one test", () => {
    const expected = 1588
    const actual = partOne(templateMap, codeData);
    expect(actual).toBe(expected);
});

test("part one test", () => {
    const expected = 2188189693529;
    const actual = partTwo(templateMap, codeData);
    expect(actual).toBe(expected);
});