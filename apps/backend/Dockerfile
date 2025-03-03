FROM node:22.14-alpine AS base
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

WORKDIR /app
RUN pnpm install --global turbo@^2.4.4
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN pnpm turbo prune "@the-stack/backend" --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
 
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/.env.frontend apps/frontend/.env
COPY --from=builder /app/.env.backend apps/backend/.env

RUN pnpm turbo run build

FROM base AS runner
ENV NODE_ENV=production

WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer /app/apps/backend/build ./apps/backend

EXPOSE 8080

CMD ["node", "apps/backend/bin/server.js"]