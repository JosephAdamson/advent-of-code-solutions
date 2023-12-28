package main

import (
	"os"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := os.Getwd()
	path = path + "/input_D3_test.txt"
	matrix := getMatrix(path)
	expected := 4361
	actual := partOne(matrix)

	if actual != expected {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_getNumber(t *testing.T) {
	m := [][]string{
		{".", ".", ".", ".", "2", "4", "5", ".", ".", "."},
	}
	expected := 245
	actual := getNumber(0, 5, m)

	if actual != expected {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := os.Getwd()
	path = path + "/input_D3_test.txt"
	matrix := getMatrix(path)
	expected := 467835
	actual := partTwo(matrix)

	if actual != expected {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}
