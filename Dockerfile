FROM node:24.11.1-alpine

WORKDIR /app

COPY server/ ./server/
COPY runtime/ ./runtime/
COPY VERSION ./VERSION

VOLUME /app

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

USER node

CMD ["node", "./runtime/runtime-entry.mjs"]
