package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func routes() http.Handler {
	router := httprouter.New()

	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	})

	router.Handler(http.MethodGet, "/favorites", http.HandlerFunc(getFavorites))

	standard := alice.New(withCors, jsonResponse)

	return standard.Then(router)
}
