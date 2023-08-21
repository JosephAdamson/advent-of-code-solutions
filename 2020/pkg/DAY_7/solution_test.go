package main

import (
	"2020/pkg/utils"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D7_test.txt"
	data := createRuleSet(path)
	expected := 4
	actual := partOne(data, "shiny gold")
	if expected != actual {
		t.Errorf("%d does equal actual %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D7_test.txt"
	data := createRuleSet(path)
	expected := 32
	actual := partTwo(data, "shiny gold")
	if expected != actual {
		t.Errorf("%d does equal actual %d", expected, actual)
	}
}

func Test_partTwo_2(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D7_test_2.txt"
	data := createRuleSet(path)
	expected := 126
	actual := partTwo(data, "shiny gold")
	if expected != actual {
		t.Errorf("%d does equal actual %d", expected, actual)
	}
}
