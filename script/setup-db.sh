#!/bin/bash

export $(cat .env | xargs)
docker pull postgres:latest
docker run -d \
  --name smart-translator-db \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DATABASE \
  -p 5432:5432 \
  postgres:latest

echo "PostgreSQL container started with the following parameters:"
echo "POSTGRES_USER: $POSTGRES_USER"
echo "POSTGRES_PASSWORD: $POSTGRES_PASSWORD"
echo "POSTGRES_DATABASE: $POSTGRES_DATABASE"
