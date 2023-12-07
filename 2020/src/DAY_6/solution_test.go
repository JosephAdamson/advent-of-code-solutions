package main

import (
	"testing"
)

func Test_parseGroup(t *testing.T) {
	data := []string{
		`abc`,
		`a
		b
		c`,
		`ab
		ac`,
		`a
		a
		a
		a`,
		`b`,
	}
	expected := 11
	actual := partOne(data)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	data := []string{
		`abc`,
		`a
		b
		c`,
		`ab
		ac`,
		`a
		a
		a
		a`,
		`b`,
	}
	expected := 6
	actual := partTwo(data)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}
