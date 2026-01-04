FROM node:24.11.1-alpine

WORKDIR /app

COPY server/ ./server/

VOLUME /app

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

USER node

CMD ["node", "./server/entry.mjs"]
