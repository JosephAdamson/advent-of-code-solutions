package main

import (
	"2020/pkg/utils"
	"testing"
)

func Test_partOne(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D10_test_1.txt"
	data := prepData(path)
	expected := 35
	actual := partOne(data)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}

func Test_partOneTestTwo(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D10_test_2.txt"
	data := prepData(path)
	expected := 220
	actual := partOne(data)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}

func Test_partTwo(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D10_test_1.txt"
	data := prepData(path)
	expected := int64(8)
	actual := partTwo(data)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}

func Test_partTwoTestTwo(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D10_test_2.txt"
	data := prepData(path)
	actual := int64(19208)
	expected := partTwo(data)
	if actual != expected {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}

func Test_partTwoTestThree(t *testing.T) {
	path, _ := utils.GetPath()
	path = path + "/input_D10_test_3.txt"
	data := prepData(path)
	actual := int64(2)
	expected := partTwo(data)
	if actual != expected {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}
