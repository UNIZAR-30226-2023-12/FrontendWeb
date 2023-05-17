#!/bin/bash

if docker images melodia/react:latest | grep -q melodia/react
then
    echo "La imagen docker de react está instalada en su equipo. Se va a utilizar la imagen encontrada para generar el contenedor."
else
    echo "No se ha encontrado la imagen docker de react. La imagen para generar el contenedor se va a crear a partir de los ficheros existentes."
    if [ -f react_image.tar ]
    then
        docker image load -i react_image.tar
    else
        ./build.sh
    fi
fi
docker compose up -d