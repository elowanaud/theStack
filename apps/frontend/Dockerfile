FROM node:22-alpine AS base
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

WORKDIR /app
RUN pnpm install --global turbo@1.10.12
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN pnpm turbo prune @the-stack/frontend --docker
 
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

RUN pnpm turbo run build --filter=!./apps/backend
 
FROM base AS runner
ENV NODE_ENV=production

WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/locales ./apps/frontend/locales

EXPOSE 3000
 
CMD ["node", "apps/frontend/server.js"]