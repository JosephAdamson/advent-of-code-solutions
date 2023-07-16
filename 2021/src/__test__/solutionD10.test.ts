import { partOne, partTwo } from "../Day_10/solutionD10";

const data = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]"
];

test("part one test", () => {
    const expected = 26397;
    const actual = partOne(data);
    expect(actual).toBe(expected);
});

test("part two test", () => {
    const expected = 288957;
    const actual = partTwo(data);
    expect(actual).toBe(expected);
})