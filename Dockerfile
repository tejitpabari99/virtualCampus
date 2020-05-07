FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update &&\
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_13.x | bash && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential
    #apt-get install -y openssh-server 

#RUN systemctl ssh start && systemctl ssh enable
#RUN echo "root:root" | chpasswd
#RUN mkdir /var/run/sshd
#RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

#EXPOSE 22

#RUN service ssh restart


#RUN mkdir /var/run/sshd
#RUN echo 'root:root' | chpasswd
#RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
#RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

#ENV NOTVISIBLE "in users profile"
#RUN echo "export VISIBLE=now" >> /etc/profile


RUN npm install -g gatsby-cli

EXPOSE 9000

WORKDIR /app
COPY ./package.json .
#COPY ./package-lock.json .
RUN npm install
COPY . .
#CMD ["/usr/sbin/sshd", "-D"]
CMD ["tail", "-f", "/dev/null"]
