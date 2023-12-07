package main

import "testing"

func Test_partOne(t *testing.T) {
	data := []int{
		1721,
		979,
		366,
		299,
		675,
		1456,
	}
	expected := 514579
	actual := partOne(data)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	data := []int{
		1721,
		979,
		366,
		299,
		675,
		1456,
	}
	expected := 241861950
	actual := partTwo(data)
	if expected != actual {
		t.Errorf("%d didn't match %d", expected, actual)
	}
}
