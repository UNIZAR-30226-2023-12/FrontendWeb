#!/bin/bash

# copiar ficheros necesarios
mkdir melodia
cd melodia
cp -r ../../melodia/package.json .
cp -r ../../melodia/package-lock.json .
cp -r ../../melodia/public/ .
cp -r ../../melodia/src/ .

# construir la imagen
cd ..
docker build -t melodia/react:latest .

# eliminar las copias redundantes
rm -rf ./melodia/

docker image save melodia/react:latest -o react_image.tar