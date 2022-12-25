package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

type application struct {
	firebaseApp  *firebase.App
	firebaseAuth *auth.Client
	infoLog      *log.Logger
	errorLog     *log.Logger
}

func main() {
	port := ":8080"

	ctx := context.Background()
	sa := option.WithCredentialsFile("./config/firebase-credentials.json")

	fb, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		fmt.Printf("error initializing app: %v\n", err)
		return
	}

	auth, err := fb.Auth(ctx)
	if err != nil {
		fmt.Printf("error getting Auth client: %v\n", err)
		return
	}

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	app := &application{
		firebaseApp:  fb,
		firebaseAuth: auth,
		infoLog:      infoLog,
		errorLog:     errorLog,
	}

	srv := &http.Server{
		Addr:    port,
		Handler: app.routes(),
	}

	app.infoLog.Printf("POPISFILMS - Starting server on %s", port)
	err = srv.ListenAndServe()
	log.Fatal(err)
}
