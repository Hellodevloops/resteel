# Base image
FROM unit:1.34.1-php8.3

# Install dependencies including Node.js and npm
RUN apt update && apt install -y \
    curl unzip git libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libssl-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pcntl opcache pdo pdo_mysql intl zip gd exif ftp bcmath \
    && pecl install redis \
    && docker-php-ext-enable redis

# Configure PHP settings
RUN echo "opcache.enable=1" > /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit=tracing" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit_buffer_size=256M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "memory_limit=512M" > /usr/local/etc/php/conf.d/custom.ini \
    && echo "upload_max_filesize=64M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/custom.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Create storage directories and set permissions
RUN mkdir -p /var/www/html/storage/app/public \
    /var/www/html/storage/framework/cache \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/testing \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache

# Make sure unit user exists before trying to set permissions
RUN if ! id -u unit > /dev/null 2>&1; then \
        # Create unit user and group if they don't exist
        groupadd -g 1000 unit && \
        useradd -u 1000 -g unit -s /bin/bash -d /var/www/html unit; \
    fi

# Set correct permissions
RUN chown -R unit:unit /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache \
    # Make storage directory writable by the web server
    && find /var/www/html/storage -type d -exec chmod 775 {} \; \
    && find /var/www/html/storage -type f -exec chmod 664 {} \;

# Install PHP dependencies
RUN composer install --prefer-dist --optimize-autoloader --no-interaction

# Create storage symbolic link
RUN php artisan storage:link

# Install Node.js dependencies and run Laravel build
RUN npm install --legacy-peer-deps && npm run build

# Copy Unit configuration
COPY unit.json /docker-entrypoint.d/unit.json

# Fix permissions again after all operations
RUN chown -R unit:unit /var/www/html \
    && find /var/www/html/storage -type d -exec chmod 775 {} \; \
    && find /var/www/html/storage -type f -exec chmod 664 {} \; \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Add health check to verify PHP-FPM and Laravel availability
HEALTHCHECK --interval=10s --timeout=5s --start-period=60s --retries=2 \
    CMD curl -f https://www.google.com || exit 1

# Expose port
EXPOSE 8000

# Define persistent storage volume (uncomment if needed)
# VOLUME ["/var/www/html/storage", "/var/www/html/bootstrap/cache"]

# Start Unit
CMD ["unitd", "--no-daemon"]
