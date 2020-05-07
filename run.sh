#!/bin/sh

sudo docker build -t hello .
sudo docker run -d --name cvc -v ~/Desktop/virtualCampus:/app -p 9000:9000 hello

sudo docker exec -it cvc /bin/bash

