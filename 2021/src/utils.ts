import { readFileSync } from 'fs'

function readInDataInt(path: string) {
    try {
        const dataRaw = readFileSync(path, "utf-8");
        const dataArr = dataRaw.split("\n").map(num => {
            return parseInt(num)
        });
        return dataArr;
    } catch (error) {
        console.log(error);
    }
}

function readInDataStr(path: string) {
    try {
        const dataRaw = readFileSync(path, "utf-8");
        return dataRaw.split("\n");
    } catch (error) {
        console.log(error)
    }
}

function processInputIntArr(path: string) {
    try {
        const dataRaw = readFileSync(path, "utf-8");
        const data = dataRaw
            .split(",")
            .map(value => parseInt(value));
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {
    readInDataInt,
    readInDataStr,
    processInputIntArr
}