package main

import (
	"2020/pkg/utils"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D4_test.txt"
	entries := processData(path)
	expected := 2
	actual := partOne(entries)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_byr(t *testing.T) {
	e1 := "2002"
	e2 := "2003"
	if checkNumericField(e1, 1920, 2002) != true {
		t.Errorf("%s could not be validated", e1)
	}
	if checkNumericField(e2, 1920, 2002) != false {
		t.Errorf("%s could not be validated", e2)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D4_test.txt"
	entries := processData(path)

	expected := 4
	actual := partTwo(entries)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}
