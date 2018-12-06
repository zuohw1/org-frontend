FROM hub.ihr.local/nginx:mainline-alpine

COPY dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY mime.types /etc/nginx/mime.types

EXPOSE 80
