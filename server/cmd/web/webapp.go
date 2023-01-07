package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

type webapp struct {
}

func (web webapp) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	currentDir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	buildDir := filepath.Join(currentDir, "../build/")
	fmt.Println(buildDir)
	fs := http.FileServer(http.Dir(buildDir))
	fs.ServeHTTP(w, r)
}
