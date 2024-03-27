FROM node:20.11.0 AS build

WORKDIR /app

COPY dist/colivraison/* .

EXPOSE 4200

FROM nginx:latest

COPY --from=build /app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
