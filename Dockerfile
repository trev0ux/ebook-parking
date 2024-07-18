FROM node:18-alpine as base

WORKDIR /src

# Build
FROM base as build


COPY --link package.json package-lock.json .
RUN npm ci

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

EXPOSE 3000
ENV PORT 3000

ENV NODE_ENV production

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]