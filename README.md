# Popisfilms
* Small app built with react and go to make lists of favorite movies

## Local Setup

### Configuring firebase

- add `src/credentails.js` with firebase config
- add `server/firebase-credentails.js` with firebase service account

### Install dependencies

```
apt install golang npm
go install github.com/cosmtrek/air@latest
go mod download
npm install
```

## Running locally

```
npm run dev
```

## Running on docker (TODO):

```
docker-compose up -d --build
```
