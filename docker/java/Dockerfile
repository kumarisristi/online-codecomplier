FROM eclipse-temurin:21-jdk-jammy

WORKDIR /workspace

RUN useradd -m runner
USER runner

CMD ["sh", "-c", "javac Main.java && java Main"]
