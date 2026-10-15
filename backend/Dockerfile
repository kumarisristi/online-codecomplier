FROM node:20-slim

# Docker CLI so the backend can spawn sibling execution containers
RUN apt-get update && apt-get install -y --no-install-recommends docker.io \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]