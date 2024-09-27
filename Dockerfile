FROM node:20-slim

RUN apt-get update -y
RUN apt-get install openssl -y

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma@5.20.0

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]