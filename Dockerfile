# Build frontend
FROM node:latest AS frontend
WORKDIR /
COPY codecrisp-frontend/package*.json ./
RUN npm install
COPY codecrisp-frontend/ .
RUN npm run build

# Build backend
FROM node:latest AS backend
WORKDIR /
COPY /package*.json ./
RUN npm install
COPY / .
COPY --from=frontend /app/build ./public
EXPOSE 3000
CMD ["npm", "start"]