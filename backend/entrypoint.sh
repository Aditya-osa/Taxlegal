#!/usr/bin/env bash

# Run migrations
php artisan migrate --force

# Clear and cache config/routes/views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Link storage if not exists
php artisan storage:link || true

# Start Apache
apache2-foreground
