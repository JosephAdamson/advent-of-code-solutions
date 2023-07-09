import { readFileSync } from "fs";
import { resolve } from "path";
import { processInputIntArr } from "../utils";

const PATH = resolve(__dirname, "input_D7.txt");

let crabs: number[] | undefined = processInputIntArr(PATH);

/* 
--- Day 7: The Treachery of Whales ---
A giant whale has decided your submarine is its next meal, and it's much faster than you are. 
There's nowhere to run!

Suddenly, a swarm of crabs (each in its own tiny submarine - it's too deep for them otherwise) zooms in to
rescue you! They seem to be preparing to blast a hole in the ocean floor; sensors indicate a massive underground 
cave system just beyond where they're aiming!

The crab submarines all need to be aligned before they'll have enough power to blast a large enough hole for your
submarine to get through. However, it doesn't look like they'll be aligned before the whale catches you! 
Maybe you can help?

There's one major catch - crab submarines can only move horizontally.

You quickly make a list of the horizontal position of each crab (your puzzle input). Crab submarines have limited
fuel, so you need to find a way to make all of their horizontal positions match while requiring them to spend 
as little fuel as possible.

For example, consider the following horizontal positions:

16,1,2,0,4,2,7,1,2,14
This means there's a crab with horizontal position 16, a crab with horizontal position 1, and so on.

Each change of 1 step in horizontal position of a single crab costs 1 fuel. You could choose any horizontal
position to align them all on, but the one that costs the least fuel is horizontal position 2:

Move from 16 to 2: 14 fuel
Move from 1 to 2: 1 fuel
Move from 2 to 2: 0 fuel
Move from 0 to 2: 2 fuel
Move from 4 to 2: 2 fuel
Move from 2 to 2: 0 fuel
Move from 7 to 2: 5 fuel
Move from 1 to 2: 1 fuel
Move from 2 to 2: 0 fuel
Move from 14 to 2: 12 fuel
This costs a total of 37 fuel. This is the cheapest possible outcome; more expensive outcomes include aligning 
at position 1 (41 fuel), position 3 (39 fuel), or position 10 (71 fuel).

Determine the horizontal position that the crabs can align to using the least fuel possible. How much fuel
must they spend to align to that position?

Thoughts:

First idea:

Calculate the cost of alignment at each possible position for each crab? 

    Given the total number of crab subs === 1000 in the puzzle input and the highest horizontal
    position is 1951 (lets round up to 2000) we would need to do 1000 aligment calculations 2000
    times to get the optimal position (saving each number of increments for a position and then sorting
    the results in ascending order) so that's roughly 2 million operations, which is not great.


Second idea:

Use averages?

- sort positions into groupings (0-100, 101-200, 201-300, ect) and move crabs according to which group has the 
highest frequency (probably not great, relies on the range of the input being fixed and wouldn't work for the test
input) 
- How about the median?
*/
function partOne(crabs: number[] | undefined) {
    if (crabs) {
        crabs.sort((a, b) => a - b);
        const median = Math.floor(crabs.length / 2);
        let totalFuel = 0;
        for (let i = 0; i < crabs.length; i++) {
            totalFuel += Math.abs(crabs[median] - crabs[i]);
        }
        return totalFuel;
    }
}
//console.log(partOne(crabs));

/*
--- Part Two ---
The crabs don't seem interested in your proposed solution. Perhaps you misunderstand crab engineering?

As it turns out, crab submarine engines don't burn fuel at a constant rate. Instead, each change of 1 step in 
horizontal position costs 1 more unit of fuel than the last: the first step costs 1, the second step costs 2, 
the third step costs 3, and so on.

As each crab moves, moving further becomes more expensive. This changes the best horizontal position to align 
them all on; in the example above, this becomes 5:

Move from 16 to 5: 66 fuel
Move from 1 to 5: 10 fuel
Move from 2 to 5: 6 fuel
Move from 0 to 5: 15 fuel
Move from 4 to 5: 1 fuel
Move from 2 to 5: 6 fuel
Move from 7 to 5: 3 fuel
Move from 1 to 5: 10 fuel
Move from 2 to 5: 6 fuel
Move from 14 to 5: 45 fuel
This costs a total of 168 fuel. This is the new cheapest possible outcome; the old alignment position (2) now 
costs 206 fuel instead.

Determine the horizontal position that the crabs can align to using the least fuel possible so they can make you 
an escape route! How much fuel must they spend to align to that position? 

Thoughts

- Calculate the Mean of the input and use that for our horizontal position
*/
function partTwo(crabs: number[] | undefined) {
    if (crabs) {
        let mean = crabs.reduce((acc, curr) => acc += curr, 0) / crabs.length;
        // math.round not working out here (0.5 is in the lower bound for this?)
        mean = mean % 1 > 0.6 ? Math.ceil(mean) : Math.floor(mean);
        
        let totalFuel = 0;
        for (let crab of crabs) {
            const steps = Math.abs(mean - crab);
            totalFuel += triNum(steps);
        }
        return totalFuel;
    }
}
console.log(partTwo(crabs));

// helper for calculating trianglar numbers (fuel cost according to crab logic)
function triNum(n: number) {
    if (n === 0) {
        return 0;
    }
    let triSum = 0;
    for (let i = 1; i <= n; i++) {
        triSum += i;
    }
    return triSum;
}

export {
    partOne,
    triNum,
    partTwo
}