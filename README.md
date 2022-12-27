# Frontend

## Configuring firebase

- add `frontend/src/credentails.js` with firebase config, copy it from
  `frontend/src/credentails.js.dist`

## Running

RUN on root:

```
docker-compose up -d --build
```

```
npm start --prefix ./frontend
```

# Backend

Running

```
make run dev -C ./backend
```
