# Etapa 1: deps (só prod)
FROM node:20-alpine AS deps
WORKDIR /app

# Copie package.json e package-lock.json (lock é obrigatório p/ npm ci)
COPY package.json package-lock.json ./

# Falhe explicitamente se o lock sumir
RUN test -f package-lock.json || (echo "ERRO: package-lock.json ausente" && exit 1)

# Instala apenas prod (npm >=7)
RUN npm ci --omit=dev

# Etapa 2: builder (se precisar rodar build/test/lint)
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci                        # inclui devDependencies para build/test

COPY . .
# Se seu app tiver build (ex.: TypeScript, bundling), rode aqui:
# RUN npm run build

# Etapa 3: runtime (mínimo possível)
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copia node_modules de produção
COPY --from=deps /app/node_modules ./node_modules
# Copia apenas o necessário para executar
COPY package.json ./
COPY src ./src
# Se tiver build artefacts:
# COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "src/index.js"]
