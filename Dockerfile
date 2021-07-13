# Stage 1: Use yarn to build the app
#FROM node:14 as builder
#WORKDIR /usr/src/app
#COPY package.json yarn.lock ./
#RUN yarn
#COPY . ./
#RUN yarn build
#
#FROM nginx:1.17.10-alpine
#RUN apk add nano && apk add curl
#RUN rm -rf /etc/nginx/conf.d/default.conf
#COPY Nginx.conf /etc/nginx/conf.d
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]



FROM nginx:alpine

WORKDIR /app
COPY package.json yarn.lock ./

# Install node.js
RUN apk update && \
    apk add nodejs npm python3 make curl g++

# Build Application
COPY . ./
RUN npm run build
RUN cp -r ./build/. /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY Nginx.conf /etc/nginx/conf.d

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
