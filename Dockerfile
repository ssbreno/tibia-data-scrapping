FROM node:20 AS builder

ENV NODE_ENV=build

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install

COPY . ./

COPY prisma ./prisma/

RUN npx prisma generate

RUN pnpm run build

RUN pnpm prune --prod

FROM node:20

ENV NODE_ENV=development

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/prisma /app/prisma

CMD pnpm run start:prod
