package main

import (
	"2020/pkg/utils"
	"fmt"
	"math"
	"strconv"
)

/*
--- Day 12: Rain Risk ---
Your ferry made decent progress toward the island, but the storm came in faster than anyone expected.
The ferry needs to take evasive actions!

Unfortunately, the ship's navigation computer seems to be malfunctioning; rather than giving a route
directly to safety, it produced extremely circuitous instructions. When the captain uses the PA system
to ask if anyone can help, you quickly volunteer.

The navigation instructions (your puzzle input) consists of a sequence of single-character actions
paired with integer input values. After staring at them for a few minutes, you work out what they probably
mean:

Action N means to move north by the given value.
Action S means to move south by the given value.
Action E means to move east by the given value.
Action W means to move west by the given value.
Action L means to turn left the given number of degrees.
Action R means to turn right the given number of degrees.
Action F means to move forward by the given value in the direction the ship is currently facing.
The ship starts by facing east. Only the L and R actions change the direction the ship is
facing. (That is, if the ship is facing east and the next instruction is N10, the ship would move
north 10 units, but would still move east if the following action were F.)

For example:

F10
N3
F7
R90
F11
These instructions would be handled as follows:

F10 would move the ship 10 units east (because the ship starts by facing east) to east 10, north 0.
N3 would move the ship 3 units north to east 10, north 3.
F7 would move the ship another 7 units east (because the ship is still facing east) to east 17, north 3.
R90 would cause the ship to turn right by 90 degrees and face south; it remains at east 17, north 3.
F11 would move the ship 11 units south to east 17, south 8.
At the end of these instructions, the ship's Manhattan distance (sum of the absolute values of its

	east/west position and its north/south position) from its starting position is 17 + 8 = 25.

Figure out where the navigation instructions lead. What is the Manhattan distance between that location
and the ship's starting position?
*/

func getDirections() []string {
	return []string{"N", "E", "S", "W"}
}

func getManhattanDistance(x int, y int) int {
	return int(math.Abs(float64(x)) + math.Abs(float64(y)))
}

func partOne(instructions []string) (int, error) {
	x := 0
	y := 0
	directions := getDirections()
	n := len(directions)
	directionPos := 1

	for _, token := range instructions {
		cmd := string(token[0])
		inc, err := strconv.Atoi(string(token[1:]))
		if err != nil {
			return -1, err
		}
		if cmd == "F" {
			cmd = directions[directionPos]
		}

		switch cmd {
		case "R":
			directionPos = (inc/90 + directionPos) % n
		case "L":
			mov := directionPos - inc/90
			if mov < 0 {
				directionPos = n - int(math.Abs(float64(mov)))
			} else {
				directionPos = mov
			}
		case "N":
			y += inc
		case "E":
			x += inc
		case "S":
			y -= inc
		case "W":
			x -= inc
		case "F":
		default:

		}
	}
	return getManhattanDistance(x, y), nil
}

/*
--- Part Two ---
Before you can give the destination to the captain, you realize that the actual action meanings were printed on
the back of the instructions the whole time.

Almost all of the actions indicate how to move a waypoint which is relative to the ship's position:

Action N means to move the waypoint north by the given value.
Action S means to move the waypoint south by the given value.
Action E means to move the waypoint east by the given value.
Action W means to move the waypoint west by the given value.
Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
Action F means to move forward to the waypoint a number of times equal to the given value.
The waypoint starts 10 units east and 1 unit north relative to the ship. The waypoint is relative to the ship;
that is, if the ship moves, the waypoint moves with it.

For example, using the same instructions as above:

F10 moves the ship to the waypoint 10 times (a total of 100 units east and 10 units north), leaving the ship at
east 100, north 10. The waypoint stays 10 units east and 1 unit north of the ship.
N3 moves the waypoint 3 units north to 10 units east and 4 units north of the ship. The ship remains at east 100,
north 10.
F7 moves the ship to the waypoint 7 times (a total of 70 units east and 28 units north), leaving the ship at east
170, north 38. The waypoint stays 10 units east and 4 units north of the ship.
R90 rotates the waypoint around the ship clockwise 90 degrees, moving it to 4 units east and 10 units south of
the ship. The ship remains at east 170, north 38.
F11 moves the ship to the waypoint 11 times (a total of 44 units east and 110 units south), leaving the ship at
east 214, south 72. The waypoint stays 4 units east and 10 units south of the ship.
After these operations, the ship's Manhattan distance from its starting position is 214 + 72 = 286.

Figure out where the navigation instructions actually lead. What is the Manhattan distance between that location
and the ship's starting position?
*/

func rotateAxis(waypointY int, waypointX int, cmd string, inc int) (int, int) {
	// find the waypoint reset coords for R (90, 180, 270) and L (90, 180, 270)
	//fmt.Printf("before: y = %d, x = %d %s\n", waypointY, waypointX, cmd)

	wpY, wpX := waypointX, waypointY
	if cmd == "R" {
		if inc == 90 {
			wpY = waypointX * -1
			wpX = waypointY
		} else if inc == 180 {
			wpY = waypointY * -1
			wpX = waypointX * -1
		} else {
			wpY = waypointX
			wpX = waypointY * -1
		}
	}

	if cmd == "L" {
		if inc == 90 {
			wpY = waypointX
			wpX = waypointY * -1
		} else if inc == 180 {
			wpY = waypointY * -1
			wpX = waypointX * -1
		} else {
			wpY = waypointX * -1
			wpX = waypointY
		}
	}
	//fmt.Printf("after: y = %d, x = %d %s\n", waypointY, waypointX, cmd)
	return wpY, wpX
}

func partTwo(instructions []string) (int, error) {
	waypointY := 1
	waypointX := 10

	boatX := 0
	boatY := 0

	//fmt.Printf("boatY: %d, boatX: %d, wx: %d wy: %d\n", boatY, boatX, waypointX, waypointY)
	for _, token := range instructions {
		cmd := string(token[0])
		inc, err := strconv.Atoi(string(token[1:]))
		if err != nil {
			return -1, nil
		}

		switch cmd {
		case "R":
			waypointY, waypointX = rotateAxis(waypointY, waypointX, cmd, inc)
		case "L":
			waypointY, waypointX = rotateAxis(waypointY, waypointX, cmd, inc)
		case "F":
			fmt.Println(waypointY*inc, waypointX*inc)
			boatY += waypointY * inc
			boatX += waypointX * inc
		case "N":
			waypointY += inc
		case "E":
			waypointX += inc
		case "S":
			waypointY -= inc
		case "W":
			waypointX -= inc
		}
		//fmt.Printf("boatY: %d, boatX: %d, wx: %d wy: %d\n", boatY, boatX, waypointX, waypointY)
	}
	return getManhattanDistance(boatX, boatY), nil
}

func main() {
	path, _ := utils.GetPath()
	path = path + "/input_D12.txt"
	instructions, _ := utils.ReadInputStr(path, "\n")
	//fmt.Println(partOne(instructions))
	fmt.Println(partTwo(instructions))
}
