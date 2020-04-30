FROM gatsby:v1

WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN yarn install && yarn cache clean
COPY . .
CMD ["gatsby", "develop", "-H", "0.0.0.0", "-p", "9000" ]