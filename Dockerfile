# THIS IS DEVELOPMENT DOCKERFILE
# DO NOT USE IN PRODUCTION

FROM node:latest

WORKDIR /home/adventnavyzva
COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]
