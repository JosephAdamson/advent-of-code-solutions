package main

import (
	"os"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := os.Getwd()
	path = path + "/input_D2_test.txt"
	expected := 8
	actual := partOne(path)

	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := os.Getwd()
	path = path + "/input_D2_test.txt"
	expected := 2286
	actual := partTwo(path)

	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}
