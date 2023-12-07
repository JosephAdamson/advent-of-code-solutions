package main

import (
	"2020/pkg/utils"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D13_test.txt"
	timestamp, buses, _ := parseData(path)
	expected := 295
	actual := partOne(timestamp, buses)

	if expected != actual {
		t.Errorf("%d doesn't equal actual %d", expected, actual)
	}
}
