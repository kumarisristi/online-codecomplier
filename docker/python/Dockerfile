FROM python:3.12-slim

WORKDIR /workspace

# Tkinter + virtual display support
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3-tk \
    xvfb \
    xauth \
    && rm -rf /var/lib/apt/lists/*

# Non-root user
RUN useradd -m runner

USER runner

# Code + input are mounted at runtime into /workspace
CMD ["sh", "-c", "xvfb-run -a python3 main.py"]