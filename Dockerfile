FROM node:18.16.1

EXPOSE 5678

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD npm run run:dev