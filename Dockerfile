FROM nginx:alpine

WORKDIR /app
COPY build ./

RUN apk update

RUN ls -la
RUN cp -r . /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

