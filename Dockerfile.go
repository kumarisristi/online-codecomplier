FROM golang:1.25-alpine

WORKDIR /app

RUN apk add --no-cache bash

CMD ["go", "run", "main.go"]
