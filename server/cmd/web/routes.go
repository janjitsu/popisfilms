package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.notFound(w)
	})

	protected := alice.New(app.requireAuthentication)

	router.Handler(http.MethodGet, "/favorites", protected.ThenFunc(http.HandlerFunc(app.getFavorites)))

	standard := alice.New(app.responseHeaders, app.logRequest, app.validateUserToken)

	return standard.Then(router)
}
