package main

import (
	"log"
	"net/http"
)

func main() {
	port := ":8080"

	srv := &http.Server{
		Addr:    port,
		Handler: routes(),
	}

	log.Printf("POPISFILMS - Starting server on %s\n", port)
	err := srv.ListenAndServe()
	log.Fatal(err)
}
