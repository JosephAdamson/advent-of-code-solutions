package main

import (
	"2020/pkg/utils"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D11_test.txt"
	grid := processInput(path)
	expected := 37
	actual := partOne(grid)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D11_test.txt"
	grid := processInput(path)
	expected := 26
	actual := partTwo(grid)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}
