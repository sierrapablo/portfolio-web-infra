FROM node:24.11.1-alpine

WORKDIR /app

VOLUME /app

EXPOSE 4321

USER node

CMD ["node", "./server/entry.mjs"]
