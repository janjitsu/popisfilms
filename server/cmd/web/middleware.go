package main

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/janjitsu/popisfilms/server/internal/models"
)

func printHeaders(r *http.Request) {
	for name, values := range r.Header {
		for _, value := range values {
			fmt.Println(name, "=", value)
		}
	}
}

func (app *application) logRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.infoLog.Printf("%s - %s %s %s", r.RemoteAddr, r.Proto, r.Method, r.URL.RequestURI())

		next.ServeHTTP(w, r)
	})
}

func (app *application) responseHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func (app *application) requireAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !app.isAuthenticated(r) {
			app.clientError(w, http.StatusUnauthorized, models.ErrInvalidCredentials)
			return
		}

		w.Header().Add("Cache-Control", "no-store")

		next.ServeHTTP(w, r)
	})
}

func (app *application) validateUserToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.Background()

		authorizationHeader := r.Header.Get("authorization")
		token := strings.Replace(authorizationHeader, "Bearer ", "", -1)
		if token == "" {
			next.ServeHTTP(w, r)
			return
		}

		tokenVerificationResult, err := app.auth.VerifyIDToken(ctx, token)
		//@TODO if token is invalid?
		//@TODO if token is expired?

		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			app.clientError(w, http.StatusUnauthorized, err)
			return
		}

		if tokenVerificationResult.UID != "" {
			ctx := context.WithValue(r.Context(), userIDContextKey, tokenVerificationResult.UID)
			r = r.WithContext(ctx)
			app.infoLog.Printf("User %v (%s) validated", tokenVerificationResult.Claims["name"], tokenVerificationResult.UID)
		}

		next.ServeHTTP(w, r)
	})
}
