#!/bin/bash

curl http://localhost:4000
# Query Parameters
curl 'http://localhost:4000?name=bob&pet=pangolin&sport=boxing'
# Path Parameters
curl http://localhost:4000/jenny
curl http://localhost:4000/joanne/tiger
# Second segment (has) is a literal, the first and third are params
curl http://localhost:4000/suzy/has/elephant
curl http://localhost:4000/joan/has/kittens
# Matches a regex: three leters, three numbers
curl http://localhost:4000/abc123
curl http://localhost:4000/Rfv332
# Match a pattern: '/ab(cd)?e'
curl http://localhost:4000/abe
curl http://localhost:4000/abcde
# Match a pattern: '/a+b+e' and catch a param
curl http://localhost:4000/a-be/judith
curl http://localhost:4000/aaaa-bbbbe/agatha

# Test RESTful methods
curl --request POST -H 'Content-Type: application/json' -d "{'this is': 'post'}" http://localhost:4000
curl --request PUT -H 'Content-Type: application/json' -d "{'this is': 'put'}" http://localhost:4000
curl --request PATCH -H 'Content-Type: application/json' -d "{'this is': 'patch'}" http://localhost:4000
curl --request DELETE -H 'Content-Type: application/json' -d "{'this is': 'delete'}" http://localhost:4000
