#!/usr/bin/env bash

# Start Apache in background
apache2-foreground &

# Wait a moment for Apache to start
sleep 5

# Run migrations (don't fail if they don't work)
php artisan migrate --force || echo "Migrations failed, continuing..."

# Clear and cache config/routes/views
php artisan config:cache || echo "Config cache failed, continuing..."
php artisan route:cache || echo "Route cache failed, continuing..."
php artisan view:cache || echo "View cache failed, continuing..."

# Link storage if not exists
php artisan storage:link || true

# Keep the script running
wait
