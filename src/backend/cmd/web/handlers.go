package main

import (
	"context"
	"net/http"

	"github.com/janjitsu/popisfilms/src/backend/internal/models"
)

func (app *application) getFavorites(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	userID := r.Context().Value(userIDContextKey).(string)

	query, err := app.firestore.Collection("users").Doc(userID).Get(ctx)
	if err != nil {
		app.serverError(w, err)
		return
	}

	var favorites models.Favorites

	err = query.DataTo(&favorites)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.render(w, http.StatusOK, favorites)
}
