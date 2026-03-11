# Base image
FROM node:22-alpine AS base

# 1. Install dependencies 
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# We only copy package.json because you are missing package-lock.json
COPY package.json ./
RUN npm install

# 2. Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pass environment variables to the build phase
ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_STRAPI_API_URL=$NEXT_PUBLIC_STRAPI_API_URL

RUN npm run build

# 3. Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Cloud Run expects the container to listen on port 8080 by default
ENV PORT 8080
EXPOSE 8080

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

# Start Next.js on port 8080
CMD ["npm", "start", "--", "-p", "8080"]
