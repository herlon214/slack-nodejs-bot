FROM node:8.11.1

COPY . /var/app

WORKDIR /var/app

RUN npm i

CMD node src/index.js