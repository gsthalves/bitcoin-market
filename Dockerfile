FROM node:18-slim

# setup application

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json ./
COPY .npmrc ./

RUN npm install

COPY . ./
COPY --chown=node:node . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "prd"]