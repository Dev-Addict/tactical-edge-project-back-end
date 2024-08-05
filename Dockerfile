FROM node:18.12.1-alpine3.16 AS base

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .


FROM base AS development
EXPOSE 4000

FROM node:18.12.1-alpine3.16 AS production

ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN NODE_ENV=development yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["npm", "start"]
