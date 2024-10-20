import { partOne, partTwo } from "../DAY_16/solutionD16";

//-----part one-----
const eg1 = "8A004A801A8002F478"; //packet version sum = 16
const eg2 = "620080001611562C8802118E34"; //packet version sum = 12
const eg3 = "C0015000016115A2E0802F182340"; //packet version sum = 23 
const eg4 = "A0016C880162017C3686B18A3D4780"; //packet version sum = 31

test("part one test", () => {
    const expected = 16;
    const actual = partOne(eg1);
    expect(actual).toBe(expected);
});

test("part one test 2", () => {
    const expected = 12;
    const actual = partOne(eg2);
    expect(actual).toBe(expected);
});

test("part one test 3", () => {
    const expected = 23;
    const actual = partOne(eg3);
    expect(actual).toBe(expected);
});

test("part one test 4", () => {
    const expected = 31;
    const actual = partOne(eg4);
    expect(actual).toBe(expected);
});

//-----part two-----
const eg5 = "C200B40A82"; // 3
const eg6 = "04005AC33890"; // 54
const eg7 = "880086C3E88112"; // 7
const eg8 = "CE00C43D881120"; // 9
const eg9 = "D8005AC2A8F0"; // 1
const eg10 = "F600BC2D8F"; // 0
const eg11 = "9C005AC2F8F0"; // 0
const eg12 = "9C0141080250320F1802104A08"; // 1

test("part two test 1", () => {
    const expected = 3;
    const actual = partTwo(eg5);
    expect(actual).toBe(expected);
});

test("part two test 2", () => {
    const expected = 54;
    const actual = partTwo(eg6);
    expect(actual).toBe(expected);
});

test("part two test 3", () => {
    const expected = 7;
    const actual = partTwo(eg7);
    expect(actual).toBe(expected);
});

test("part two test 4", () => {
    const expected = 9;
    const actual = partTwo(eg8);
    expect(actual).toBe(expected);
});

test("part two test 5", () => {
    const expected = 1;
    const actual = partTwo(eg9);
    expect(actual).toBe(expected);
});

test("part two test 6", () => {
    const expected = 0;
    const actual = partTwo(eg10);
    expect(actual).toBe(expected);
});

test("part two test 7", () => {
    const expected = 0;
    const actual = partTwo(eg11);
    expect(actual).toBe(expected);
});

test("part two test 8", () => {
    const expected = 1;
    const actual = partTwo(eg12);
    expect(actual).toBe(expected);
});