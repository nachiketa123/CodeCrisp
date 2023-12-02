FROM node:16

#Working Directory
WORKDIR /app


#Copy ==> Package for all Dependencies
COPY ./package.json ./package.json

#Copy ==> all the files in Working Directory
COPY ./public ./public
COPY ./src ./src

#RUN the command to load all dependencies
RUN npm install

#Exposing container Port
EXPOSE 3000

#Run the App
CMD ["npm","start"]