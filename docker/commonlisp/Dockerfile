FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends sbcl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

CMD ["bash"]