FROM php:8.4-apache-bullseye
# Build timestamp: 2025-04-19-17-45

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Enable Apache mod_rewrite and fix MPM conflict
RUN a2dismod mpm_event && a2enmod mpm_prefork && a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project files from backend directory
COPY ./taxlegal/backend/ .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Configure Apache for Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's|<Directory /var/www/html>|<Directory /var/www/html/public>|g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's|AllowOverride None|AllowOverride All|g' /etc/apache2/sites-available/000-default.conf

# Expose port
EXPOSE 80

# Build script for migrations
RUN chmod +x entrypoint.sh

# Create test files to verify Apache is working
RUN echo '<?php echo "Laravel is working!"; ?>' > /var/www/html/public/health.php
RUN echo '<?php phpinfo(); ?>' > /var/www/html/public/info.php

# Run migrations and start apache
CMD ["./entrypoint.sh"]
