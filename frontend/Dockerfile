FROM node:18-alpine3.15

# Defining the directory where the app will run inside docker image
WORKDIR /app

ADD ./ /app

RUN ls -la

RUN yarn

# Inicializa a aplicação
CMD ["yarn", "start"]


# DOC: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
# < BUILD DOCKER IMAGE > docker build -t <your username>/node-web-app .
# < SHOW ALL DOCKER IMAGES > docker images
# < RUN THE IMAGE > docker run -p 49160:8080 -d <your username>/node-web-app
# < Enter the container > docker exec -it <container id> sh
