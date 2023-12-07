package main

import (
	"os"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := os.Getwd()
	path = path + "/input_D1_test.txt"
	sequences := getData(path)
	expected := 142
	actual := partOneAndTwo(sequences)

	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := os.Getwd()
	path = path + "/input_D1_test_2.txt"
	sequences := getData(path)
	expected := 281
	actual := partOneAndTwo(sequences)

	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}
