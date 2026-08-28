FROM node:24-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY __fixtures__/ ./__fixtures__
COPY __tests__/ ./__tests__
COPY src ./src
COPY .prettierrc.yml eslint.config.js jest.config.ts tsconfig.json ./

RUN npm run build

FROM node:24-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  tar=1.34+dfsg-1.2+deb12u1 \
  zstd=1.5.4+dfsg2-5 \
  && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/dist/index.js /
COPY entrypoint.sh /
ENTRYPOINT ["entrypoint.sh"]
