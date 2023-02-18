#!/bin/bash

docker build --pull --rm -f "Dockerfile" -t msprofilenew:latest "."
docker run --rm -it -d -p 8080:8080/tcp msprofilenew:latest