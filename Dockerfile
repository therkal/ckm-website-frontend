FROM nginx:1.23.0-alpine

## Copy our nginx configs
COPY build/nginx.config /etc/nginx/conf.d/default.conf

COPY dist/ /usr/share/nginx/html