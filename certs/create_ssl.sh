#!/bin/bash

# Create a self-signed certificate for the server

# CD to script
cd "$(dirname "$0")"

# CD into "certs"
cd certs

# Generate TLS certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256

echo "Done"
