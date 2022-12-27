package models

type Movie struct {
	imdbID string `json:"imdbID"`
	Title  string `json:"Title"`
	Poster string `json:"Poster"`
	Year   string `json:"Year"`
	Type   string `json:"Type"`
}
