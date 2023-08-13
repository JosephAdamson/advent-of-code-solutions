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

func ProcessStrData(path string, delimiter string) []string {
	data, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}
	tokens := strings.Split(string(data), delimiter)
	return tokens
}

func ProcessIntData(path string, deliemter string) []int {
	data, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}
	tokens := strings.Split(string(data), deliemter)
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
