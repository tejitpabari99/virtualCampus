#!/bin/sh

echo "Building image"
sudo docker build -t cvcimage .
echo "Running image"
echo "If you edit files locally in the current directory, the changes with automatically be shown in the docker container"
sudo docker run -d --name cvc -v $(pwd):/app -p 9000:9000 cvcimage

echo "Container cvc now running in the background"
echo "Setting up npm on container"
sudo docker exec cvc /app/npm-setup.sh
echo "Entering the container"
echo "To start gatsby develop, run: $ gatsby develop -H 0.0.0.0 -p 9000"
sudo docker exec -it cvc /bin/bash

