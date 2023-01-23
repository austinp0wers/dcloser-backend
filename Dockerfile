# Base image
FROM node:18

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build:prod

FROM node:lts AS node_modules
COPY package.json yarn.lock ./

RUN yarn install --prod

FROM node:lts

ARG PORT=3003

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT
# Start the server using the production build
CMD [ "node", "dist/main.js" ]