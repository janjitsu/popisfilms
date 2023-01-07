package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	protected := alice.New(app.validateUserToken, app.requireAuthentication, app.jsonResponse)
	router.Handler(http.MethodGet, "/api/favorites", protected.ThenFunc(app.getFavorites))

	standard := alice.New(app.cors, app.logRequest)

	webapp := webapp{}

	router.Handler(http.MethodGet, "/static/*filepath", webapp)
	router.NotFound = webapp

	return standard.Then(router)
}
