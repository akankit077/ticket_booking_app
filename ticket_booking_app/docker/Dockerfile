FROM node:14

WORKDIR /ticket_booking_app

COPY package*.json ./

RUN npm install --save dotenv
RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]
