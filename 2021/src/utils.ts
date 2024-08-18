import { readFileSync } from 'fs';

//-------------------IO--------------------

function readInDataInt(path: string) {
    const dataRaw = readFileSync(path, "utf-8");
    const dataArr = dataRaw.split("\n").map(num => {
        return parseInt(num)
    });
    return dataArr;
}

function readInDataStr(path: string) {
    const dataRaw = readFileSync(path, "utf-8");
    return dataRaw.split("\n");
}

function processInputIntArr(path: string) {
    const dataRaw = readFileSync(path, "utf-8");
    const data = dataRaw
        .split(",")
        .map(value => parseInt(value));
    return data;
}

function processData2DIntArr(path: string) {
    const data: number[][] = [];
    const dataRaw = readFileSync(path, "utf-8");
    dataRaw.split("\n").forEach(line =>
        data.push(line.split("")
            .map(value => parseInt(value))
        )
    );
    return data;
}

//-----------------pretty printing--------------------

function drawMatrix<T>(lines: T[][]) {
    let lineStr = ""
    for (let line of lines) {
        for (let value of line) {
            lineStr = lineStr.concat(value + " ");
        }
        lineStr = lineStr.concat("\n");
    }
    console.log(lineStr);
}

function padMatrix(data: number[][], paddingValue: number) {
    if (data) {
        const m = data[0].length;
        const paddedData: number[][] = [];
        paddedData.push(Array(m + 2).fill(paddingValue));
        for (let row of data) {
            paddedData.push([paddingValue, ...row, paddingValue]);
        }
        paddedData.push(Array(m + 2).fill(paddingValue));
        return paddedData;
    } else {
        throw Error("data is null or undefined");
    }
}

//---------------data structures--------------

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

interface BinaryHeap<T> {
    parent: (i: number) => number;
    leftChild: (i: number) => number;
    swap: (i: number, j: number) => void;
    bubbleUp: (i: number) => void
    bubbleDown: (i: number) => void
    insert: (value: T) => void
    poll: () => T
    peek: () => T
    remove: (i: number) => void 
    isEmpty: () => boolean
}

class MatrixNode {
    y: number
    x: number
    cost: number

    constructor(y: number, x: number, cost: number) {
        this.y = y;
        this.x = x;
        this.cost = cost;
    }
}

class NodePriorityQueue implements BinaryHeap<MatrixNode> {
    heap: MatrixNode[];
    size: number;

    constructor(capacity: number) {
        if (capacity < 0) {
            throw new Error("Capacity cannot be negative number");
        }
        this.heap = Array(capacity);
        this.size = -1;
    }

    parent(i: number) {
        return Math.floor((i - 1) / 2);
    }

    leftChild(i: number) {
        return (2 * i) + 1
    }

    rightChild(i: number) {
        return (2 * i) + 2  
    }

    swap(i: number, j: number) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    bubbleUp(i: number) {
        while (i > 0 && this.heap[this.parent(i)].cost > this.heap[i].cost) {
                this.swap(this.parent(i), i)
                i = this.parent(i)
        }
    }

    bubbleDown(i: number) {
        let minIndex = i;

        const l = this.leftChild(i)
        if (l <= this.size && this.heap[l].cost < this.heap[minIndex].cost) {
            minIndex = l;
        }

        const r = this.rightChild(i)
        if (r <= this.size && this.heap[r].cost < this.heap[minIndex].cost) {
            minIndex = r;
        }

        if (i != minIndex) {
            this.swap(i, minIndex);
            this.bubbleDown(minIndex);
        }
    }

    insert(value: MatrixNode) {
        this.size = this.size + 1;
        this.heap[this.size] = value;
        this.bubbleUp(this.size);
    }

    poll() {
        const result = this.heap[0]
        // replace the value at the root with the last leaf
        this.heap[0] = this.heap[this.size]
        this.size = this.size - 1;
        this.bubbleDown(0)
        return result;
    }

    peek() {
        return this.heap[0];
    }

    remove(i: number) {
        this.heap[i].cost = this.peek().cost -1;
        this.bubbleUp(i);
        this.poll();
    }

    isEmpty() {
        return this.size == -1;
    }
}

export {
    readInDataInt,
    readInDataStr,
    processInputIntArr,
    processData2DIntArr,
    isSuperset,
    union,
    intersection,
    symmetricDifference,
    difference,
    eqSet,
    drawMatrix,
    padMatrix,
    MatrixNode,
    NodePriorityQueue
}