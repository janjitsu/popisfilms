FROM golang:1.19-alpine AS build
RUN apk --update add ca-certificates

WORKDIR /app
COPY . go.* /app/
RUN go mod download
COPY . .
WORKDIR /app/cmd/web/
RUN CGO_ENABLED=0 go build -o /bin/app

RUN ls -la

FROM scratch
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=build /bin/app /bin/app
ENTRYPOINT ["/bin/app"]
