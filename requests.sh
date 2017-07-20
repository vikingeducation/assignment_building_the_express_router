#!/bin/bash

# Funky paths
curl http://localhost:4000
curl http://localhost:4000/jenny
curl http://localhost:4000/joanne/tiger
curl http://localhost:4000/suzy/has/elephant
curl http://localhost:4000/abc123

# Test RESTful methods
curl --request POST -H 'Content-Type: application/json' -d "{'this is': 'post'}" http://localhost:4000
curl --request PUT -H 'Content-Type: application/json' -d "{'this is': 'put'}" http://localhost:4000
curl --request PATCH -H 'Content-Type: application/json' -d "{'this is': 'patch'}" http://localhost:4000
curl --request DELETE -H 'Content-Type: application/json' -d "{'this is': 'delete'}" http://localhost:4000
