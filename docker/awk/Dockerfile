
FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends gawk \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

CMD ["bash"]
