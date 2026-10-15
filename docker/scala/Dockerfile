FROM eclipse-temurin:21-jdk

ARG SCALA_VERSION=3.8.2

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fL "https://github.com/scala/scala3/releases/download/${SCALA_VERSION}/scala3-${SCALA_VERSION}.tar.gz" \
    -o /tmp/scala.tar.gz \
    && tar -xzf /tmp/scala.tar.gz -C /opt \
    && ln -s /opt/scala3-${SCALA_VERSION}/bin/scala /usr/local/bin/scala \
    && ln -s /opt/scala3-${SCALA_VERSION}/bin/scalac /usr/local/bin/scalac \
    && rm /tmp/scala.tar.gz

WORKDIR /workspace

CMD ["scala", "--version"]
