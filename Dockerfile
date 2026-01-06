FROM node:24.11.1-alpine

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@10.27.0 --activate

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY server/ ./server/
COPY runtime/ ./runtime/
COPY VERSION ./VERSION

VOLUME /app

ENV HOST=0.0.0.0
ENV PORT=3000
ENV METRICS_PORT=9100

EXPOSE 3000
EXPOSE 9100

USER node

CMD ["node", "./runtime/runtime-entry.mjs"]
