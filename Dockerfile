FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update &&\
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_13.x | bash && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential

RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sudo sysctl -p


EXPOSE 9000

WORKDIR /app
CMD ["tail", "-f", "/dev/null"]
