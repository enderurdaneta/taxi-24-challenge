FROM node:lts-alpine AS development

WORKDIR /app


COPY package.json ./

COPY . .

RUN npm install

RUN npm run build

FROM node:lts-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
