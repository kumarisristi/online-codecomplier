FROM php:8.3-cli-alpine

WORKDIR /workspace

RUN adduser -D runner
USER runner

CMD ["php", "main.php"]
