package main

import "testing"

func Test_partOne(t *testing.T) {
	data := []string{
		"nop +0",
		"acc +1",
		"jmp +4",
		"acc +3",
		"jmp -3",
		"acc -99",
		"acc +1",
		"jmp -4",
		"acc +6",
	}
	expected := 5
	actual, _, _, _ := partOne(data, 0)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	data := []string{
		"nop +0",
		"acc +1",
		"jmp +4",
		"acc +3",
		"jmp -3",
		"acc -99",
		"acc +1",
		"jmp -4",
		"acc +6",
	}
	expected := 8
	actual := partTwo(data)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}
