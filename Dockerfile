FROM nginx:alpine

WORKDIR /app
COPY package.json yarn.lock ./

# Install node.js
RUN apk update && \
    apk add nodejs npm python3 make curl g++

# Build Application
#COPY . ./
#RUN npm run build
RUN ls -la
COPY ./build build
RUN cp -r ./build/. /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY Nginx.conf /etc/nginx/conf.d

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
