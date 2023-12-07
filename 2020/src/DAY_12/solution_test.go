package main

import (
	"2020/pkg/utils"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D12_test.txt"
	instructions, _ := utils.ReadInputStr(path, "\n")
	expected := 25
	actual, _ := partOne(instructions)
	if actual != expected {
		t.Errorf("%d does equal %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D12_test.txt"
	instructions, _ := utils.ReadInputStr(path, "\n")
	expected := 286
	actual, _ := partTwo(instructions)
	if actual != expected {
		t.Errorf("%d does equal %d", expected, actual)
	}
}
