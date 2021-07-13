# Stage 1: Use yarn to build the app
FROM node:14 as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.17.10-alpine
RUN apk add nano && apk add curl
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY Nginx.conf /etc/nginx/conf.d
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
