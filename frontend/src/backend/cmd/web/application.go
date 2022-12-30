package main

import (
	"errors"
	"fmt"
	"net/http"
	"reflect"
	"runtime/debug"

	"github.com/janjitsu/popisfilms/src/backend/internal/models"
)

func (app *application) serverError(w http.ResponseWriter, err error) {
	trace := fmt.Sprintf("%s: %s\n%s", reflect.TypeOf(err), err.Error(), debug.Stack())
	app.errorLog.Output(2, trace)
	message := fmt.Sprintf("%s - %s", http.StatusText(http.StatusInternalServerError), err.Error())
	response := models.NewErrorResponse(message)
	JSONError(w, response, http.StatusInternalServerError)
}

func (app *application) clientError(w http.ResponseWriter, status int, err error) {
	message := fmt.Sprintf("%s - %s", http.StatusText(status), err.Error())
	response := models.NewErrorResponse(message)
	responseString, _ := response.ToString()
	app.infoLog.Printf("%d %s - %s", status, http.StatusText(status), responseString)
	JSONError(w, response, status)
}

func (app *application) notFound(w http.ResponseWriter) {
	app.clientError(w, http.StatusNotFound, errors.New("Not Found"))
}

func (app *application) render(w http.ResponseWriter, status int, body any) {
	responseBody := models.NewResponse(body)
	jsonResponse, err := responseBody.ToJson()
	if err != nil {
		app.serverError(w, err)
	}
	stringResponse, _ := responseBody.ToString()
	app.infoLog.Printf("%d %s - %s", status, http.StatusText(status), stringResponse)
	w.WriteHeader(status)
	w.Write(jsonResponse)
}

func (app *application) isAuthenticated(r *http.Request) bool {
	return r.Context().Value(userIDContextKey) != ""
}

func JSONError(w http.ResponseWriter, response *models.Response, code int) {
	responseJson, _ := response.ToJson()
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(code)
	w.Write(responseJson)
}
