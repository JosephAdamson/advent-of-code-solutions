package main

import (
	"2020/pkg/utils"
	"fmt"
	"strings"
)

func processData(path string) [][]string {
	raw := utils.ProcessStrData(path)
	var areaMap [][]string
	for _, line := range raw {
		areaMap = append(areaMap, strings.Split(line, ""))
	}
	return areaMap
}

/*
--- Day 3: Toboggan Trajectory ---
With the toboggan login problems resolved, you set off toward the airport. While travel by toboggan might be easy,
it's certainly not safe: there's very minimal steering and the area is covered in trees. You'll need to see
which angles will take you near the fewest trees.

Due to the local geology, trees in this area only grow on exact integer coordinates in a grid. You make a map
(your puzzle input) of the open squares (.) and trees (#) you can see. For example:

..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
These aren't the only trees, though; due to something you read about once involving arboreal genetics and biome
stability, the same pattern repeats to the right many times:

..##.........##.........##.........##.........##.........##.......  --->
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
You start on the open square (.) in the top-left corner and need to reach the bottom (below the bottom-most row
on your map).

The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational
numbers); start by counting all the trees you would encounter for the slope right 3, down 1:

From your starting position at the top-left, check the position that is right 3 and down 1. Then, check the
position that is right 3 and down 1 from there, and so on until you go past the bottom of the map.

The locations you'd check in the above example are marked here with O where there was an open square and X where
there was a tree:

..##.........##.........##.........##.........##.........##.......  --->
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you
encounter?

Thoughts:

	Traverse the data as a matrix, when our path goes out of bounds just do some wrap around calculations
*/
func partOne(areaMap [][]string, right int, down int) int {
	trees := 0
	n, m := len(areaMap), len(areaMap[0])
	i, j := 0, 0

	for i < n {
		if areaMap[i][j] == "#" {
			trees++
		}
		j = (j + right) % m
		i = i + down
	}
	return trees
}

/*
--- Part Two ---
Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop,
after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the
top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together,
these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?
*/
func partTwo(areaMap [][]string) int {
	traversalPattern := [][]int{
		{1, 3, 5, 7, 1},
		{1, 1, 1, 1, 2},
	}
	n := len(traversalPattern[0])
	var treeCounts []int
	for i := 0; i < n; i++ {
		treeCounts = append(treeCounts,
			partOne(areaMap, traversalPattern[0][i], traversalPattern[1][i]))
	}
	result := treeCounts[0]
	for i := 1; i < len(treeCounts); i++ {
		result *= treeCounts[i]
	}
	return result
}

func main() {
	path := utils.GetPath() + "/input_D3.txt"
	areaMap := processData(path)
	fmt.Println(partOne(areaMap, 3, 1))
	fmt.Println(partTwo(areaMap))
}
