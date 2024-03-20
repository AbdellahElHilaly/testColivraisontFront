FROM node:20.11.0

WORKDIR /app

COPY dist/colivraison/* .

EXPOSE 4200

RUN npm install -g http-server

CMD ["cd", "browser"]
CMD ["http-server", "-p", "4200"]
