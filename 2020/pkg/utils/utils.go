package utils

import (
	"os"
	"strconv"
	"strings"
)

func GetPath() string {
	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	return dir
}

func ProcessIntData(path string) []int {
	data, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}
	tokens := strings.Split(string(data), "\n")
	var result []int
	for _, val := range tokens {
		num, err := strconv.Atoi(val)
		if err != nil {
			panic(err)
		}
		result = append(result, num)
	}
	return result
}