FROM node:16
WORKDIR /
COPY . /
RUN npm install
ENV PORT 8070
EXPOSE 8070
CMD ["npm", "run", "dev"]