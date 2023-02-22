FROM node:9-alpine
#FROM node:slim
WORKDIR /usr/src/app
COPY package.json .
#RUN npm config set unsafe-perm true
RUN npm install
#RUN npm install -g nodemon express
#RUN npm install -g mysql --save
COPY . .
EXPOSE 8000
#CMD [ "nodemon", "start" ]
CMD [ "npm", "start" ]
# App must run on port 8000
# Add your instructions to dockerize the application
#My image in Docker Hub: udecdj2022/bootcamp:v1
