FROM node:20-slim

RUN apt-get update -y
RUN apt-get install openssl -y

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma@5.20.0

COPY . .

# I added migrate here to be more easy to test (it is not de best way to do that).

# RUN npx prisma migrate dev 

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# Command to start the Node.js application
CMD ["npm", "start"]