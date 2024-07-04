# Primeiro estágio: Builder
FROM node:20 AS builder

ENV NODE_ENV=build

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./

# Instalar pnpm e dependências
RUN npm install -g pnpm && pnpm install

COPY . ./

# Copiar a pasta prisma contendo o schema.prisma
COPY prisma ./prisma/

RUN npx prisma generate

RUN pnpm run build

RUN pnpm prune --prod

# Segundo estágio: Produção
FROM node:20

ENV NODE_ENV=development

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Instalar pnpm no segundo estágio
RUN npm install -g pnpm

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

# Certificar-se de que o prisma/schema.prisma está no local correto
COPY --from=builder /app/prisma /app/prisma

CMD pnpm run start:prod
