FROM node:latest

# Creating app directory
RUN mkdir -p /usr/src/backend-app
WORKDIR /usr/src/backend-app

COPY package.json /usr/src/backend-app

RUN npm install

CMD ["npm", "start"]