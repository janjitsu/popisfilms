FROM janjitsu/nodejs-and-go:latest as build
WORKDIR /app
ADD . go.* /app/
RUN go mod download
RUN go install github.com/cosmtrek/air@latest
RUN yarn
RUN ls -la

FROM build
WORKDIR /app
CMD ["yarn", "start"]
