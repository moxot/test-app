FROM node:lts-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build

USER node

CMD ["npm", "run", "start:dev:migrate:seed"]
