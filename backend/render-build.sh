#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
composer install --no-dev --optimize-autoloader

# Run migrations (force for production)
php artisan migrate --force

# Clear and cache config/routes/views
php artisan config:cache
php artisan route:cache
php artisan view:cache
