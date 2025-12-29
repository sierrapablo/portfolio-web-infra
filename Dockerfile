FROM nginxinc/nginx-unprivileged:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

VOLUME /usr/share/nginx/html

EXPOSE 4321

CMD ["nginx", "-g", "daemon off;"]
