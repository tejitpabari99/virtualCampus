#!/bin/sh

# This script stops all running docker containers before
# rebuilding them and running them again.

sudo docker-compose down
sudo docker-compose build
sudo docker-compose up 
