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

# Create a new Apache config file
RUN cat > /etc/apache2/sites-available/laravel.conf << 'EOF'
<VirtualHost *:80>
    DocumentRoot /var/www/html/public
    <Directory /var/www/html/public>
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF

# Disable default site and enable Laravel site
RUN a2dissite 000-default.conf && a2ensite laravel.conf

# Expose port
EXPOSE 80

# Build script for migrations
RUN chmod +x entrypoint.sh

# Create test files to verify Apache is working
RUN echo '<h1>Apache is working!</h1>' > /var/www/html/public/test.html
RUN echo '<?php echo "Laravel is working!"; ?>' > /var/www/html/public/health.php
RUN echo '<?php phpinfo(); ?>' > /var/www/html/public/info.php

# Run migrations and start apache
CMD ["./entrypoint.sh"]
