# Tech Challenger Spot2

Proyecto realizado con Next 14 y Laravel 11

## Despliegue

### Requerimientos

PHP 8.2

Bun o minimo de node version 18

### Usando docker

ingresar el siguiente comando para desplegar

    docker-compose up -d

### Migracion DB
    docker compose exec nginx php artisan migrate

### Variables de entorno Docker
Aparte de las variable de laravel al final del .env se debe configurar las siguientes.

`NEXT_PUBLIC_API_URL` url del backend ejemplo `https://tuapibackend/api`

`NEXT_USE_DOCKER` le dice a la app que esta usando docker `true|false`

`DOMAIN` Dominio para el Nginx que usa el docker

`DATABASE_PORT` Puerto de la base de datos externo

`PHPMYADMIN_PORT` Puerto para y abrir el phpmyadmin

`APP_PORT` Puerto de la App frontend

`DB_HOST` Esta al hacer usar docker debe quedar con el valor db ejemplo `DB_HOST=db`

## Demo

https://acortador.deladmin.xyz/

## Documentacion Api

https://acortador.deladmin.xyz/documentation
