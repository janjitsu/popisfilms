package main

import (
	"net/http"

	"popisfilms/internal/models"
)

func (app *application) getFavorites(w http.ResponseWriter, r *http.Request) {
	favorites := []models.Movie{
		{
			Poster: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
			Title:  "The Shinning",
			Type:   "movie",
			Year:   "1980",
			ImdbID: "tt0081505",
		},
		{
			Poster: "https://m.media-amazon.com/images/M/MV5BMTA1ODUzMDA3NzFeQTJeQWpwZ15BbWU3MDgxMTYxNTk@._V1_SX300.jpg",
			Title:  "About Time",
			Type:   "movie",
			Year:   "2013",
			ImdbID: "tt2194499",
		},
	}

	app.render(w, http.StatusOK, favorites)
}
