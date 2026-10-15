FROM gcc:13-bookworm

WORKDIR /workspace

RUN useradd -m runner
USER runner

# Compile then run; entrypoint is overridden by executionService, this is a fallback
CMD ["sh", "-c", "g++ -O2 -o main main.cpp && ./main"]
