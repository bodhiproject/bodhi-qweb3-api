FROM node:9.3.0

WORKDIR /usr/src/bodhi/bodhi-api

COPY package.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh wait-for-it.sh
