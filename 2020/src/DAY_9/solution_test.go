package main

import "testing"

// func Test_partOne(t *testing.T) {
// 	data := []int{
// 		35,
// 		20,
// 		15,
// 		25,
// 		47,
// 		40,
// 		62,
// 		55,
// 		65,
// 		95,
// 		102,
// 		117,
// 		150,
// 		182,
// 		127,
// 		219,
// 		299,
// 		277,
// 		309,
// 		576,
// 	}
// 	expected := 127
// 	actual := partOne(data, 5)
// 	if expected != actual {
// 		t.Errorf("%d doesn't equal %d", expected, actual)
// 	}
// }

func Test_partTwo(t *testing.T) {
	data := []int{
		35,
		20,
		15,
		25,
		47,
		40,
		62,
		55,
		65,
		95,
		102,
		117,
		150,
		182,
		127,
		219,
		299,
		277,
		309,
		576,
	}
	expected := 62
	actual := partTwo(data, 5)
	if expected != actual {
		t.Errorf("%d doesn't equal %d", expected, actual)
	}
}
