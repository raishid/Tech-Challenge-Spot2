FROM dwchiang/nginx-php-fpm:8.2.14-fpm-bullseye-nginx-1.24.0 AS base

ARG DOMAIN
ARG PROXY_PORT
ARG MYSQL_DATABASE
ARG MYSQL_PASSWORD
ARG MYSQL_USER

RUN apt-get update && apt-get install -y libzip-dev libsodium-dev

RUN apt-get update && apt-get install -y \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    wget

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets zip sodium

RUN mkdir -p /var/log/php-fpm/

ENV COMPOSER_ALLOW_SUPERUSER=1

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer;

RUN composer config --global process-timeout 3000

RUN ls -la /etc/nginx

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.tpl /tmp/default.tpl

COPY ./docker/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

RUN sed -e "s/%domain%/${DOMAIN}/g" \
        -e "s/%proxy_port%/${PROXY_PORT}/g" \
        /tmp/default.tpl > /etc/nginx/conf.d/default.conf

COPY backend /var/www/html/backend

RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html/backend
RUN cp .env.example /var/www/html/backend/.env

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

EXPOSE 5000