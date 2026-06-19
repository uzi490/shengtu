FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV ASSET_DATA_DIR=/data

COPY --from=build /app/dist ./dist
COPY server ./server
COPY package.json ./package.json

EXPOSE 8080
CMD ["node", "server/index.js"]
