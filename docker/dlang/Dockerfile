FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends gdc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

CMD ["bash"]