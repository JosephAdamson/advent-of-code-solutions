package main

import (
	"fmt"
	"os"
	"strings"
)

func getData(path string) []string {
	rawData, _ := os.ReadFile(path)
	sequences := strings.Split(string(rawData), "\n")
	return sequences
}

/*
--- Day 1: Trebuchet?! ---
Something is wrong with global snow production, and you've been selected to take a look.
The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are
likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars
by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar;
the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending
you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you j
ust say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already l
oading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has
been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the
Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific
calibration value that the Elves now need to recover. On each line, the calibration value can be found by
combining the first digit and the last digit (in that order) to form a single two-digit number.
*/
func partOneAndTwo(sequences []string) int {
	nums := make([]int, 0, len(sequences))

	for _, sequence := range sequences {
		pair := 0
		num := -1
		subSeq := ""
		for _, token := range sequence {
			// ascii range for integers
			if token >= 48 && token <= 57 {
				if num == -1 {
					pair = pair + int(token-'0')
				}
				num = int(token - '0')
				subSeq = ""
			} else {
				subSeq = subSeq + string(token)
				match := matchStr(subSeq)
				if match != -1 {
					if num == -1 {
						pair = pair + match
					}
					num = match
					// have to accomodate overlapping word number case
					// one
					//   eight
					subSeq = string(subSeq[len(subSeq)-1])
				}
			}
		}
		pair = pair*10 + num
		nums = append(nums, pair)
	}

	res := 0
	for _, num := range nums {
		res += num
	}

	return res
}

/*
--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters:
one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line.
For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen

In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
*/

func matchStr(s string) int {
	// no switch case :(
	s = strings.ToLower(s)
	if strings.Contains(s, "one") {
		return 1
	} else if strings.Contains(s, "two") {
		return 2
	} else if strings.Contains(s, "three") {
		return 3
	} else if strings.Contains(s, "four") {
		return 4
	} else if strings.Contains(s, "five") {
		return 5
	} else if strings.Contains(s, "six") {
		return 6
	} else if strings.Contains(s, "seven") {
		return 7
	} else if strings.Contains(s, "eight") {
		return 8
	} else if strings.Contains(s, "nine") {
		return 9
	} else {
		return -1
	}
}

func main() {
	path, _ := os.Getwd()
	path = path + "/input_D1.txt"
	sequences := getData(path)
	r := partOneAndTwo(sequences)
	fmt.Println(r)
}
