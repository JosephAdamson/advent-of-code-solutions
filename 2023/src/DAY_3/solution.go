package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

/*
--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water
source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting
anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which
one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part
is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of
numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even
diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right)
and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine
schematic?
*/

func getMatrix(path string) [][]string {
	rawData, _ := os.ReadFile(path)
	lines := strings.Split(string(rawData), "\n")
	tokenMatrix := make([][]string, len(lines)+2)

	// create matrix with with padding
	for i := 0; i < len(lines); i++ {
		tokenMatrix[i+1] = strings.Split(lines[i], "")
		tokenMatrix[i+1] = append([]string{"."}, tokenMatrix[i+1]...)
		tokenMatrix[i+1] = append(tokenMatrix[i+1], ".")
	}
	for i := 0; i < len(tokenMatrix[1]); i++ {
		tokenMatrix[0] = append(tokenMatrix[0], ".")
		tokenMatrix[len(tokenMatrix)-1] = append(tokenMatrix[len(tokenMatrix)-1], ".")
	}
	return tokenMatrix
}

func isPartNumber(start, finish, row int, engine [][]string) bool {
	for i := start - 1; i < finish+1; i++ {
		if isPartNumberHelper(row-1, i, engine) || isPartNumberHelper(row+1, i, engine) {
			return true
		}
	}
	return isPartNumberHelper(row, start-1, engine) || isPartNumberHelper(row, finish, engine)
}

func isPartNumberHelper(i, j int, engine [][]string) bool {
	_, err := strconv.Atoi(engine[i][j])
	return err != nil && engine[i][j] != "."
}

func partOne(engine [][]string) int {
	combinedPartNum := 0
	for i := 1; i < len(engine)-1; i++ {
		prev := "."
		for j := 1; j < len(engine)-1; j++ {
			if _, err := strconv.Atoi(engine[i][j]); err == nil {
				if _, err := strconv.Atoi(prev); err == nil {
					prev = prev + engine[i][j]
					// edge case for last element in a row
					if j == len(engine[i])-2 && isPartNumber(j-len(prev)+1, j, i, engine) {
						value, _ := strconv.Atoi(prev)
						combinedPartNum += value
						prev = "."
					}
				} else {
					prev = engine[i][j]
				}
			} else {
				if value, err := strconv.Atoi(prev); err == nil {
					if isPartNumber(j-len(prev), j, i, engine) {
						combinedPartNum += value
					}
				}
				prev = engine[i][j]
			}
		}
	}
	return combinedPartNum
}

/*
--- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in
the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a
phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer,
holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the
station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that
is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out
which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its
gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617
is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?
*/
func partTwo(engine [][]string) int {
	gearSum := 0
	for i := 0; i < len(engine); i++ {
		for j := 0; j < len(engine[0]); j++ {
			if engine[i][j] == "*" {
				gearSum += gearNumberSearch(i, j, engine)
			}
		}
	}
	return gearSum
}

func isNumber(i, j int, engine [][]string) bool {
	_, err := strconv.Atoi(engine[i][j])
	return err == nil
}

func getNumber(i, j int, matrix [][]string) int {
	numStr := matrix[i][j]
	p := j - 1
	q := j + 1
	for {
		_, errP := strconv.Atoi(matrix[i][p])
		_, errQ := strconv.Atoi(matrix[i][q])
		if errP != nil && errQ != nil {
			res, _ := strconv.Atoi(numStr)
			return res
		}
		if errP == nil {
			numStr = matrix[i][p] + numStr
			p--
		}
		if errQ == nil {
			numStr = numStr + matrix[i][q]
			q++
		}
	}
}

func gearNumberSearch(i, j int, engine [][]string) int {
	adjacencyCount := 0
	var postions [][]int
	prevUpper := "."
	prevLower := "."
	finish := j + 2
	for start := j - 1; start < finish; start++ {
		_, errPrevUpper := strconv.Atoi(prevUpper)
		_, errPrevLower := strconv.Atoi(prevLower)
		if isNumber(i-1, start, engine) && errPrevUpper != nil {
			adjacencyCount++
			postions = append(postions, []int{i - 1, start})
		}
		if isNumber(i+1, start, engine) && errPrevLower != nil {
			adjacencyCount++
			postions = append(postions, []int{i + 1, start})
		}
		prevUpper = engine[i-1][start]
		prevLower = engine[i+1][start]
	}
	if isNumber(i, j-1, engine) {
		adjacencyCount++
		postions = append(postions, []int{i, j - 1})
	}
	if isNumber(i, j+1, engine) {
		adjacencyCount++
		postions = append(postions, []int{i, j + 1})
	}
	if adjacencyCount == 2 {
		return getNumber(postions[0][0], postions[0][1], engine) *
			getNumber(postions[1][0], postions[1][1], engine)
	}
	return 0
}

func main() {
	path, _ := os.Getwd()
	path = path + "/input_D3.txt"
	matrix := getMatrix(path)
	fmt.Println(partOne(matrix))
	fmt.Println(partTwo(matrix))
}
