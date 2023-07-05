# deps
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# builder
FROM node:18 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_TELEMETRY_DISABLED 1

# RUN npx prisma generate  

# runner
FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/package.json  package.json
COPY --from=builder /app/public        public
COPY --from=builder /app/.next         .next
COPY --from=builder /app/prisma        ./prisma
COPY --from=builder /app/node_modules  node_modules

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development
ENV PORT 3000

CMD ["npm", "run", "dev"]