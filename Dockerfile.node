FROM node:16
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 8070
CMD ["node" , "index.js"]


