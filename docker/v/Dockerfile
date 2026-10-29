FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       curl ca-certificates unzip gcc libc6-dev \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fL https://github.com/vlang/v/releases/latest/download/v_linux.zip -o /tmp/v_linux.zip \
    && unzip /tmp/v_linux.zip -d /opt \
    && rm /tmp/v_linux.zip \
    && chmod +x /opt/v/v \
    && ln -s /opt/v/v /usr/local/bin/v

WORKDIR /workspace

CMD ["bash"]
