package main

import "testing"

func Test_partOne(t *testing.T) {
	data := []string{
		"1-3 a: abcde",
		"1-3 b: cdefg",
		"2-9 c: ccccccccc",
	}
	pd := processData(data)
	expected := 2
	actual, _ := partOne(pd)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	data := []string{
		"1-3 a: abcde",
		"1-3 b: cdefg",
		"2-9 c: ccccccccc",
	}
	pd := processData(data)
	expected := 1
	actual, _ := partTwo(pd)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}
