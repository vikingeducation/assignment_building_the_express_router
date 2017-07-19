#!/bin/bash

curl --request POST -H 'Content-Type: application/json' -d "{'this is': 'post'}" http://localhost:4000
curl --request PUT -H 'Content-Type: application/json' -d "{'this is': 'put'}" http://localhost:4000
curl --request PATCH -H 'Content-Type: application/json' -d "{'this is': 'patch'}" http://localhost:4000
curl --request DELETE -H 'Content-Type: application/json' -d "{'this is': 'delete'}" http://localhost:4000
