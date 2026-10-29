FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends guile-3.0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

CMD ["bash"]