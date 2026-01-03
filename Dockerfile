FROM node:24.11.1-alpine

WORKDIR /app

VOLUME /app

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
