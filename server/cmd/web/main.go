package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type application struct {
	auth      *auth.Client
	firestore *firestore.Client
	logger    *zap.SugaredLogger
}

func main() {
	port := fmt.Sprintf(":%s", os.Getenv("SERVER_PORT"))

	ctx := context.Background()
	sa := option.WithCredentialsFile(os.Getenv("FIREBASE_SERVICE_ACCOUNT_FILE"))

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

	firestore, err := fb.Firestore(ctx)
	if err != nil {
		fmt.Printf("error getting Firestore client: %v\n", err)
		return
	}
	defer firestore.Close()

	encoderCfg := zap.NewProductionEncoderConfig()
	encoderCfg.EncodeTime = zapcore.ISO8601TimeEncoder
	encoderCfg.EncodeLevel = zapcore.CapitalColorLevelEncoder
	encoder := zapcore.NewConsoleEncoder(encoderCfg)
	zapLogger := zap.New(zapcore.NewCore(encoder, zapcore.AddSync(os.Stdout), zap.InfoLevel))

	logger := zapLogger.Sugar()
	defer logger.Sync()

	app := &application{
		auth:      auth,
		firestore: firestore,
		logger:    logger,
	}

	srv := &http.Server{
		Addr:    port,
		Handler: app.routes(),
	}

	app.logger.Infof("POPISFILMS - Starting server on %s", port)
	err = srv.ListenAndServe()
	log.Fatal(err)
}
