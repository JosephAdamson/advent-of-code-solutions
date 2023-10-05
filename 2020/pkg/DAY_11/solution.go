package main

import (
	"2020/pkg/utils"
	"fmt"
	"reflect"
	"strings"
)

/*
--- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the
tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry,
you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you
can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat
(#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable
and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a
given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat).
The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules
cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many
seats end up occupied?
*/

// neighbours around a particular element on the grid (top, top-right etc.)

// pad the grid out (top bottom left and right with "." to make some operations easier)
func processInput(path string) [][]string {
	data, _ := utils.ReadInputStr(path, "\n")
	grid := make([][]string, 0)
	for _, row := range data {
		line := strings.Split(row, "")
		// add padding characters for start and end of each row
		line = append([]string{"."}, line...)
		line = append(line, ".")
		grid = append(grid, line)
	}
	// padding for top and bottom
	pad := make([]string, len(grid[0]))
	for i := 0; i < len(pad); i++ {
		pad[i] = "."
	}
	pad2 := make([]string, len(pad))
	copy(pad2, pad)
	grid = append([][]string{pad}, grid...)
	grid = append(grid, pad2)
	return grid
}

func initFrame() [][]int {
	return [][]int{
		{-1, 0},
		{-1, 1},
		{0, 1},
		{1, 1},
		{1, 0},
		{1, -1},
		{0, -1},
		{-1, -1},
	}
}

// copy grid state so I can use it for both answers without altering orignal,
// will need to be refactor so I can use it as a util function (make generic)
func dup2D[T comparable](grid [][]T) [][]T {
	var result [][]T
	for _, row := range grid {
		cRow := make([]T, len(row))
		copy(cRow, row)
		result = append(result, cRow)
	}
	return result
}

func checkRuleUnoccupied(state [][]string, i, j int) bool {
	frame := initFrame()
	for _, adjacentPoints := range frame {
		neighbour := state[i+adjacentPoints[0]][j+adjacentPoints[1]]
		if neighbour == "#" {
			return false
		}
	}
	return true
}

func checkRuleOccupied(state [][]string, i, j int) bool {
	frame := initFrame()
	occupiedCount := 0
	ne := ""
	for _, adjacentPoints := range frame {
		neighbour := state[i+adjacentPoints[0]][j+adjacentPoints[1]]
		ne += neighbour
		if neighbour == "#" {
			occupiedCount++
		}
	}
	return occupiedCount >= 4
}

func countOccupied(grid [][]string) int {
	count := 0
	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid[0]); j++ {
			if grid[i][j] == "#" {
				count++
			}
		}
	}
	return count
}

func printGrid(grid [][]string) {
	for _, row := range grid {
		fmt.Println(row)
	}
	fmt.Println()
}

func partOne(grid [][]string) int {
	prevState := dup2D[string](grid)
	state := dup2D[string](grid)
	//printGrid(state)
	for {
		for i := 1; i < len(state)-1; i++ {
			for j := 1; j < len(state[0])-1; j++ {
				// empty to occupied
				if prevState[i][j] == "L" && checkRuleUnoccupied(prevState, i, j) {
					state[i][j] = "#"
				}
				// occupied to empty
				if prevState[i][j] == "#" && checkRuleOccupied(prevState, i, j) {
					state[i][j] = "L"
				}
			}
		}
		if reflect.DeepEqual(state, prevState) {
			return countOccupied(state)
		}
		prevState = state
		state = dup2D(state)
	}
}

/*
--- Part Two ---
As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats
- they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of
those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....
The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............
The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.
Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied
seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules
still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and
floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs,
you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is
reached, how many seats end up occupied?
*/
func checkLinear(grid [][]string, i, j int) [][]int {
	// left, right, top, bottom
	linear := []int{j - 1, j + 1, i - 1, i + 1}
	prev := make([]int, len(linear))
	copy(prev, linear)
	n := len(grid[i]) - 1
	m := len(grid) - 1
	for {
		if linear[0] > 0 && grid[i][linear[0]] == "." {
			linear[0]--
		}
		if linear[1] < n && grid[i][linear[1]] == "." {
			linear[1]++
		}
		if linear[2] > 0 && grid[linear[2]][j] == "." {
			linear[2]--
		}
		if linear[3] < m && grid[linear[3]][j] == "." {
			linear[3]++
		}

		// exhausted the bounds of our search
		if linear[0] == 0 && linear[1] >= n && linear[2] == 0 && linear[3] >= m {
			break
		}

		if reflect.DeepEqual(linear, prev) {
			break
		}
		prev = make([]int, len(linear))
		copy(prev, linear)
	}

	return [][]int{
		{i, linear[0]},
		{i, linear[1]},
		{linear[2], j},
		{linear[3], j},
	}
}

func checkDiagonal(grid [][]string, i, j int) [][]int {
	diags := [][]int{
		{i - 1, j - 1},
		{i - 1, j + 1},
		{i + 1, j + 1},
		{i + 1, j - 1},
	}
	prev := dup2D[int](diags)
	n := len(grid[i]) - 1
	m := len(grid) - 1

	for {
		if diags[0][0] > 0 && diags[0][1] > 0 &&
			grid[diags[0][0]][diags[0][1]] == "." {
			diags[0][0]--
			diags[0][1]--
		}

		if diags[1][0] > 0 && diags[1][1] < n &&
			grid[diags[1][0]][diags[1][1]] == "." {
			diags[1][0]--
			diags[1][1]++
		}

		if diags[2][0] < m && diags[2][1] < n &&
			grid[diags[2][0]][diags[2][1]] == "." {
			diags[2][0]++
			diags[2][1]++
		}

		if diags[3][0] < m && diags[3][1] > 0 &&
			grid[diags[3][0]][diags[3][1]] == "." {
			diags[3][0]++
			diags[3][1]--
		}

		// we only need to account for i in (i, j) as they have parity of movement
		if diags[0][0] == 0 &&
			diags[1][0] == 0 &&
			diags[2][0] >= m &&
			diags[3][0] >= m {
			break
		}

		if reflect.DeepEqual(diags, prev) {
			break
		}
		prev = diags
		diags = dup2D[int](diags)
	}
	return diags
}

func partTwo(grid [][]string) int {
	prevState := dup2D(grid)
	state := dup2D(grid)
	m := len(state) - 1
	n := len(state[0]) - 1
	for {
		for i := 1; i < m; i++ {
			for j := 1; j < n; j++ {
				lines := checkLinear(prevState, i, j)
				diags := checkDiagonal(prevState, i, j)
				spaces := make([][]int, 0)
				spaces = append(spaces, lines...)
				spaces = append(spaces, diags...)
				emptyCount := 0
				occupiedCount := 0
				for _, space := range spaces {
					if prevState[space[0]][space[1]] != "#" {
						emptyCount++
					} else {
						occupiedCount++
					}
				}

				if prevState[i][j] == "L" && emptyCount == 8 {
					state[i][j] = "#"
				}

				if prevState[i][j] == "#" && occupiedCount >= 5 {
					state[i][j] = "L"
				}
			}
		}
		if reflect.DeepEqual(state, prevState) {
			return countOccupied(state)
		}
		prevState = state
		state = dup2D(state)
	}
}

func main() {
	path, _ := utils.GetPath()
	path = path + "/input_D11.txt"
	grid := processInput(path)
	fmt.Println(partOne(grid))
	fmt.Println(partTwo(grid))
}
