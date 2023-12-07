package main

import "testing"

func Test_partOne(t *testing.T) {
	data := [][]string{
		{"B", "F", "F", "F", "B", "B", "F", "R", "R", "R"},
		{"F", "F", "F", "B", "B", "B", "F", "R", "R", "R"},
		{"B", "B", "F", "F", "B", "B", "F", "R", "L", "L"},
	}
	expected := 820
	actual, _ := partOne(data)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}
