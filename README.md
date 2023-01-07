# Popisfilms
* Small app built with react and go to make lists of favorite movies

## Local Setup

### Configuring firebase

- add `.env` with firebase config to rootpath
- add `firebase-service-account.json` with firebase service account to rootpath

### Install dependencies

```
apt install golang npm
go install github.com/cosmtrek/air@latest
go mod download
npm install
```

## Running locally

```
npm start
```

## Running on docker:

```
docker-compose up --build
```
