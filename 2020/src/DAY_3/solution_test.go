package main

import (
	"testing"
)

func Test_partOne(t *testing.T) {
	areaMap := [][]string{
		{".", ".", "#", "#", ".", ".", ".", ".", ".", ".", "."},
		{"#", ".", ".", ".", "#", ".", ".", ".", "#", ".", "."},
		{".", "#", ".", ".", ".", ".", "#", ".", ".", "#", "."},
		{".", ".", "#", ".", "#", ".", ".", ".", "#", ".", "#"},
		{".", "#", ".", ".", ".", "#", "#", ".", ".", "#", "."},
		{".", ".", "#", ".", "#", "#", ".", ".", ".", ".", "."},
		{".", "#", ".", "#", ".", "#", ".", ".", ".", ".", "#"},
		{".", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"},
		{"#", ".", "#", "#", ".", ".", ".", "#", ".", ".", "."},
		{"#", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"},
		{".", "#", ".", ".", "#", ".", ".", ".", "#", ".", "#"},
	}
	expected := 7
	actual := partOne(areaMap, 3, 1)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	areaMap := [][]string{
		{".", ".", "#", "#", ".", ".", ".", ".", ".", ".", "."},
		{"#", ".", ".", ".", "#", ".", ".", ".", "#", ".", "."},
		{".", "#", ".", ".", ".", ".", "#", ".", ".", "#", "."},
		{".", ".", "#", ".", "#", ".", ".", ".", "#", ".", "#"},
		{".", "#", ".", ".", ".", "#", "#", ".", ".", "#", "."},
		{".", ".", "#", ".", "#", "#", ".", ".", ".", ".", "."},
		{".", "#", ".", "#", ".", "#", ".", ".", ".", ".", "#"},
		{".", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"},
		{"#", ".", "#", "#", ".", ".", ".", "#", ".", ".", "."},
		{"#", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"},
		{".", "#", ".", ".", "#", ".", ".", ".", "#", ".", "#"},
	}
	expected := 336
	actual := partTwo(areaMap)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}
