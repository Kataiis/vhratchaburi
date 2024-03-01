FROM node:20

# container
WORKDIR /usr/app 

COPY ./package.json ./

RUN npm install 

COPY . .

EXPOSE 8088

RUN npm run build

CMD ["npm","run", "start"]