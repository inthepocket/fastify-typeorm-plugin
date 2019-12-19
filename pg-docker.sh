#!/bin/bash

# run this file to get a working PG instance
# for running the test locally

exec docker run \
  --rm \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD='' \
  postgres:11-alpine
