import { readInDataStr } from "../utils";
import { resolve } from "path";

const PATH = resolve(__dirname, "input_D3.txt");

/*
--- Day 3: Binary Diagnostic ---
The submarine has been making some odd creaking noises, so you ask it to produce a diagnostic report just in case.

The diagnostic report (your puzzle input) consists of a list of binary numbers which, when decoded properly, can tell you many useful things about the conditions of the submarine. The first parameter to check is the power consumption.

You need to use the binary numbers in the diagnostic report to generate two new binary numbers (called the gamma rate and the epsilon rate). The power consumption can then be found by multiplying the gamma rate by the epsilon rate.

Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers in the diagnostic report. For example, given the following diagnostic report:

00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
Considering only the first bit of each number, there are five 0 bits and seven 1 bits. Since the most common bit is 1, the first bit of the gamma rate is 1.

The most common second bit of the numbers in the diagnostic report is 0, so the second bit of the gamma rate is 0.

The most common value of the third, fourth, and fifth bits are 1, 1, and 0, respectively, and so the final three bits of the gamma rate are 110.

So, the gamma rate is the binary number 10110, or 22 in decimal.

The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is 01001, or 9 in decimal. Multiplying the gamma rate (22) by the epsilon rate (9) produces the power consumption, 198.

Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. What is the power consumption of the submarine? (Be sure to represent your answer in decimal, not binary.) 

IMPL Notes: 
• The input is 12 digit binary numbers, with the input file consisting of 1000 enteries

    NAIVE: 
    
    Interate through each binary number in the data and logs the frequency on 0 and 1
    at each position O(n * k) where n is the the data and k is the length of a binary data point 

    Create the gamma and eplsion values from the frequencies O(k)
    O(n * k) + O(k) ~= O(n * k)


*/
function partOne() {
    const data: string[] | undefined = readInDataStr(PATH);
    if (data) {
        const freq_0 = Array.from({length: data[0].length}, _ => 0);
        const freq_1 = Array.from({length: data[0].length}, _ => 0);
        for (let binNum of data) {
            for (let i = 0; i < binNum.length; i++) {
                if (binNum[i] === "0") {
                    freq_0[i]++;
                } else {
                    freq_1[i]++
                }
            }
        }
        
        const gamma  = [];
        const epsilon = [];
        for (let i = 0; i < freq_0.length; i++) {
            if (freq_0[i] > freq_1[i]) {
                gamma.push("0");
                epsilon.push("1");
            } else {
                gamma.push("1");
                epsilon.push("0");
            }
        }
        console.log(parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2));
    }
}
partOne();

/*
--- Part Two ---
Next, you should verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.

Both the oxygen generator rating and the CO2 scrubber rating are values that can be found in your diagnostic report - finding them is the tricky part. Both values are located using a similar process that involves filtering out values until only one remains. Before searching for either rating value, start with the full list of binary numbers from your diagnostic report and consider just the first bit of those numbers. Then:

Keep only numbers selected by the bit criteria for the type of rating value for which you are searching. Discard numbers which do not match the bit criteria.
If you only have one number left, stop; this is the rating value for which you are searching.
Otherwise, repeat the process, considering the next bit to the right.
The bit criteria depends on which type of rating value you want to find:

To find oxygen generator rating, determine the most common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 1 in the position being considered.
To find CO2 scrubber rating, determine the least common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 0 in the position being considered.
For example, to determine the oxygen generator rating value using the same example diagnostic report from above:

Start with all 12 numbers and consider only the first bit of each number. There are more 1 bits (7) than 0 bits (5), so keep only the 7 numbers with a 1 in the first position: 11110, 10110, 10111, 10101, 11100, 10000, and 11001.
Then, consider the second bit of the 7 remaining numbers: there are more 0 bits (4) than 1 bits (3), so keep only the 4 numbers with a 0 in the second position: 10110, 10111, 10101, and 10000.
In the third position, three of the four numbers have a 1, so keep those three: 10110, 10111, and 10101.
In the fourth position, two of the three numbers have a 1, so keep those two: 10110 and 10111.
In the fifth position, there are an equal number of 0 bits and 1 bits (one each). So, to find the oxygen generator rating, keep the number with a 1 in that position: 10111.
As there is only one number left, stop; the oxygen generator rating is 10111, or 23 in decimal.
Then, to determine the CO2 scrubber rating value from the same example above:

Start again with all 12 numbers and consider only the first bit of each number. There are fewer 0 bits (5) than 1 bits (7), so keep only the 5 numbers with a 0 in the first position: 00100, 01111, 00111, 00010, and 01010.
Then, consider the second bit of the 5 remaining numbers: there are fewer 1 bits (2) than 0 bits (3), so keep only the 2 numbers with a 1 in the second position: 01111 and 01010.
In the third position, there are an equal number of 0 bits and 1 bits (one each). So, to find the CO2 scrubber rating, keep the number with a 0 in that position: 01010.
As there is only one number left, stop; the CO2 scrubber rating is 01010, or 10 in decimal.
Finally, to find the life support rating, multiply the oxygen generator rating (23) by the CO2 scrubber rating (10) to get 230.

Use the binary numbers in your diagnostic report to calculate the oxygen generator rating and CO2 scrubber rating, then multiply them together. What is the life support rating of the submarine? (Be sure to represent your answer in decimal, not binary.) 
*/
function partTwo() {
    const data: string[] | undefined = readInDataStr(PATH);
    if (data) {
        const oxygenRating = partTwoHelper([...data], Criteria.OXYGEN);
        const CO2Rating = partTwoHelper([...data], Criteria.CO2);
        const lifeSupportRating = parseInt(oxygenRating[0], 2) * parseInt(CO2Rating[0], 2);
        console.log(lifeSupportRating); 
    }
}

enum Criteria {
    OXYGEN,
    CO2
}

function partTwoHelper(data: string[], criteria: Criteria) {
    let i = 0;
    while (data.length > 1) {
        let zero = 0;
        let one = 0;
        for (let val of data) {
            if (val[i] === "0") {
                zero++;
            } else {
                one++;
            }
        }
        
        let bit: string;
        if (criteria === Criteria.OXYGEN) {
            if (zero === one) {
                bit = "1";
            } else {
                bit = Math.max(zero, one) === zero ? "0" : "1";
            }
        } else {
            if (zero === one) {
                bit = "0";
            } else {
                bit = Math.min(zero, one) === zero ? "0" : "1";
            }
        }
        data = data.filter(val => {
            return val[i] === bit;
        });
        i++;
    }
    return data;
}

partTwo();

export {
    partTwoHelper,
    Criteria
}