FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

# Use script to wait until db is ready
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY .env .env

EXPOSE 4000

# Use wait-for-it to ensure the database is up before starting the API
CMD ["wait-for-it.sh", "db:3306", "--", "node", "server.js"]
