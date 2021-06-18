# Build backend

FROM node:15-alpine AS backend

RUN apk add --no-cache build-base git python3 py3-pip sqlite
RUN ln -s /usr/bin/python3 /usr/bin/python && ln -s /usr/bin/pip3 /usr/bin/pip

WORKDIR /usr/src/app
COPY ./ ./
RUN NODE_ENV=production npm ci && npm i typescript
RUN npm run build

# Runtime container
FROM node:15-alpine

RUN mkdir -p /srv/app && chown node:node /srv/app \
 && mkdir -p /srv/data && chown node:node /srv/data

USER node
WORKDIR /srv/app
COPY --from=backend /usr/src/app/build ./build/
COPY --from=backend /usr/src/app/node_modules ./node_modules/ 
COPY --from=backend /usr/src/app/package.json ./
COPY --from=backend /usr/src/app/.production.env ./
COPY --from=backend /usr/src/app/.development.env ./

EXPOSE 1234

CMD ["npm", "run", "start"]
