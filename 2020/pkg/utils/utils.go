package utils

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func GetPath() (string, error) {
	dir, err := os.Getwd()
	if err != nil {
		return "", errors.New("could not retrieve path to current directory")
	}
	return dir, nil
}

func ProcessStrData(path string, delimiter string) ([]string, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, errors.New("could not retrieve path to current directory")
	}
	tokens := strings.Split(string(data), delimiter)
	return tokens, nil
}

func ProcessIntData(path string, deliemter string) ([]int, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("%s", err)
	}
	tokens := strings.Split(string(data), deliemter)
	var result []int
	for _, val := range tokens {
		num, err := strconv.Atoi(val)
		if err != nil {
			return nil, fmt.Errorf("%s", err)
		}
		result = append(result, num)
	}
	return result, nil
}
