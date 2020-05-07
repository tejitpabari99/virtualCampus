FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update &&\
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_13.x | bash && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential


EXPOSE 9000

WORKDIR /app
#COPY ./package.json .
#COPY ./package-lock.json .
COPY . .
#RUN npm install
#RUN npm install -g gatsby-cli
CMD ["tail", "-f", "/dev/null"]
