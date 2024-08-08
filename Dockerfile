FROM node:18-alpine as base

WORKDIR /src

# Define build arguments
ARG NODE_ENV
ARG NUXT_PUBLIC_API_URL
ARG STRIPE_PUBLIC_KEY

# Set environment variables
ENV NODE_ENV $NODE_ENV
ENV NUXT_PUBLIC_API_URL $NUXT_PUBLIC_API_URL
ENV STRIPE_PUBLIC_KEY $STRIPE_PUBLIC_KEY

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

# Pass the environment variable to the runner stage
ENV NODE_ENV production
ENV NUXT_PUBLIC_API_URL $NUXT_PUBLIC_API_URL
ENV STRIPE_PUBLIC_KEY $STRIPE_PUBLIC_KEY

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
