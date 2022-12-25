package models

type Movie struct {
	ImdbID string `json:"imdbID"`
	Title  string `json:"Title"`
	Poster string `json:"Poster"`
	Year   string `json:"Year"`
	Type   string `json:"Type"`
}
