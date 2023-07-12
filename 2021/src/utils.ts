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

// adapted set operations from 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function isSuperset<T>(set: Set<T>, subset: Set<T>) {
    for (const elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

function union<T>(setA: Set<T>, setB: Set<T>) {
    const _union = new Set(setA);
    for (const elem of setB) {
        _union.add(elem);
    }
    return _union;
}

function intersection<T>(setA: Set<T>, setB: Set<T>) {
    const _intersection = new Set();
    for (const elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

function symmetricDifference<T>(setA: Set<T>, setB: Set<T>) {
    const _difference = new Set(setA);
    for (const elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem);
        } else {
            _difference.add(elem);
        }
    }
    return _difference;
}

function difference<T>(setA: Set<T>, setB: Set<T>) {
    const _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

function eqSet<T>(setA: Set<T>, setB: Set<T>) {
    return setA.size === setB.size &&
        [...setA].every(value => setB.has(value));
}

export {
    readInDataInt,
    readInDataStr,
    processInputIntArr,
    isSuperset,
    union,
    intersection,
    symmetricDifference,
    difference,
    eqSet
}