FROM node:14.7.0-alpine3.12
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]