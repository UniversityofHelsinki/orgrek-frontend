FROM nginx:alpine

WORKDIR /app
COPY build ./

# Install node.js
RUN apk update && \
    apk add nodejs npm python3 make curl g++ nginx-mod-http-perl

# Build Application
#COPY . ./
#RUN npm run build
RUN ls -la
#RUN cp -r ./build/. /usr/share/nginx/html
RUN cp -r . /usr/share/nginx/html

#RUN rm -rf /etc/nginx/conf.d/default.conf
#COPY Nginx.conf /etc/nginx/conf.d

COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf


RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
