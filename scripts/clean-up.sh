#!/bin/bash

# This script cleans up old docker files that are no longer needed.
# These files accumulate over time and can take up a lot of space. 
sudo docker stop cvc
sudo docker volume rm $(sudo docker volume ls -qf dangling=true)
yes | sudo docker system prune -a 
