FROM node:24-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build

FROM node:24-slim

COPY --from=builder /app/package.json /app/package-lock.json /
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  tar=1.34+dfsg-1.2+deb12u1 \
  zstd=1.5.4+dfsg2-5 \
  && rm -rf /var/lib/apt/lists/* \
  && npm ci --omit=dev
COPY --from=builder /app/dist/index.js /
COPY entrypoint.sh /
ENTRYPOINT ["entrypoint.sh"]
