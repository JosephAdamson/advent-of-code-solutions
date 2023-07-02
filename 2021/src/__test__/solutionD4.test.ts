import { crossOff, partOne, partTwo, bingoSearch, sumBoard } from "../DAY_4/solutionD4";

const draws = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];
let boards: number[][];

beforeEach(() => {
    boards = [
        [
            22, 13, 17, 11, 0,
            8, 2, 23, 4, 24,
            21, 9, 14, 16, 7,
            6, 10, 3, 18, 5,
            1, 12, 20, 15, 19
        ],
    
        [
            3, 15, 0, 2, 22,
            9, 18, 13, 17, 5,
            19, 8, 7, 25, 23,
            20, 11, 10, 24, 4,
            14, 21, 16, 12, 6,
        ],
    
        [
            14, 21, 17, 24, 4,
            10, 16, 15, 9, 19,
            18, 8, 23, 26, 20,
            22, 11, 13, 6, 5,
            2, 0, 12, 3, 7,
        ]
    ];
});

test("Cross off test one", () => {
    const expected = [
        14, 21, 17, 24, 4,
        10, 16, 15, 9, 19,
        18, 8, -1, 26, 20,
        22, 11, 13, 6, 5,
        2, 0, 12, 3, 7,
    ];
    const actual = [
        14, 21, 17, 24, 4,
        10, 16, 15, 9, 19,
        18, 8, 23, 26, 20,
        22, 11, 13, 6, 5,
        2, 0, 12, 3, 7,
    ]
    crossOff(actual, 23);
    expect(actual).toStrictEqual(expected);
})

// not really possible to have duplicate squares on a bingo card but
// wanted to make sure cross off worked properly
test("Cross off test two", () => {
    const expected = [
        14, 21, 17, 24, 4,
        10, 16, 15, 9, 19,
        18, 8, -1, 26, -1,
        22, 11, 13, 6, 5,
        2, 0, 12, -1, 7,
    ];
    const actual = [
        14, 21, 17, 24, 4,
        10, 16, 15, 9, 19,
        18, 8, 23, 26, 23,
        22, 11, 13, 6, 5,
        2, 0, 12, 23, 7,
    ]
    crossOff(actual, 23);
    expect(actual).toStrictEqual(expected);
});

test("Bingo search test Truthy row", () => {
    const board = [
        14, 21, 17, 24, 4,
        10, 16, 15, 9, 19,
        -1, -1, -1, -1, -1,
        22, 11, 13, 6, 5,
        2, 0, 12, -1, 7,
    ];
    const res = bingoSearch(board);
    expect(res).toBeTruthy();
});

test("Bingo search test Truthy Col", () => {
    const board = [
        14, 21, 17, 24, -1,
        10, 16, 15, 9, -1,
        18, 8, -1, 26, -1,
        22, 11, 13, 6, -1,
        2, 0, 12, -1, -1,
    ];
    const res = bingoSearch(board);
    expect(res).toBeTruthy();
});

test("Bingo search test Falsey col", () => {
    const board = [
        14, 21, 17, 24, -1,
        10, 16, -1, 9, -1,
        18, 8, -1, 26, -1,
        22, 11, 13, 6, 5,
        2, 0, -1, -1, -1,
    ];
    const res = bingoSearch(board);
    expect(res).toBeFalsy();
});

test("Bingo search test Falsey col 2", () => {
    const board = [
         3, 15, -1, -1, 22 ,
         -1, 18, 13, -1, -1 ,
         19, 8, -1, 25, -1 ,
         20, -1, -1, -1, -1 ,
         -1, -1, 16, 12, 6
      ];
    const res = bingoSearch(board);
    expect(res).toBeFalsy();
});

test("Sum test", () => {
    const arr = [
        14, 21, 17, 24, 4,
        10, 16, 15, 9, 19,
        18, 8, -1, 26, -1,
        22, 11, 13, 6, 5,
        2, 0, 12, -1, 7,
    ];
    const expected = 279;
    const actual = sumBoard(arr);
    expect(actual).toBe(expected);
});

test("Squid bingo example part one", () => {
    const expected = 4512;
    const actual = partOne(draws, boards);
    expect(actual).toBe(expected);
});

test("Squid bingo example part two", () => {
    const expected = 1924;
    const actual = partTwo(draws, boards);
    expect(actual).toBe(expected);
});
