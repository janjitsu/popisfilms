FROM node:18-alpine3.15 as node
RUN apk --update add --no-cache ca-certificates libc6-compat
WORKDIR /download
RUN wget https://go.dev/dl/go1.19.linux-amd64.tar.gz
RUN tar -xvf go1.19.linux-amd64.tar.gz
RUN mv go /usr/local
ENV GOPATH /usr/local/go
ENV PATH $GOPATH/bin:$PATH
RUN mkdir -p $GOPATH/src $GOPATH/bin
WORKDIR $GOPATH

