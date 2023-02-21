#!/bin/bash

docker build --pull --rm -f "Dockerfile" -t capitanproducts:latest "."
docker run --rm -it -d -p 8080:8080/tcp capitanproducts:latest