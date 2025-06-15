FROM unit:1.34.1-php8.3

# Install system dependencies and Node.js
RUN apt update && apt install -y \
    curl unzip git libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libssl-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pcntl opcache pdo pdo_mysql intl zip gd exif ftp bcmath \
    && pecl install redis \
    && docker-php-ext-enable redis

# PHP configuration
RUN echo "opcache.enable=1" > /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit=tracing" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit_buffer_size=256M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "memory_limit=512M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "upload_max_filesize=64M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/custom.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel application code
COPY . .

# Ensure Laravel required directories exist
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache

# Install PHP dependencies
RUN composer install --prefer-dist --optimize-autoloader --no-interaction

# Install Node.js dependencies and build frontend assets
RUN npm install --legacy-peer-deps && npm run build

# Copy Unit configuration
COPY unit.json /docker-entrypoint.d/unit.json

# Expose Unit port
EXPOSE 8000

# Runtime commands: fix volume permissions, link storage, start Unit
CMD bash -c "\
    chown -R unit:unit /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R ug+rwX /var/www/html/storage /var/www/html/bootstrap/cache && \
    php artisan storage:link || true && \
    unitd --no-daemon"
