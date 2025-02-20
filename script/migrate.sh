#!/bin/bash
export $(cat .env | xargs)
migrate -path migration/ -database "postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DATABASE?sslmode=disable" up
