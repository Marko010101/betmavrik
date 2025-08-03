# 1. Base image for installing dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install


COPY . .

EXPOSE 3000

CMD npm run dev