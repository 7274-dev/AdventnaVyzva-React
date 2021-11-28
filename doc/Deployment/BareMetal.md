# Deployment - Bare metal

<hr>

MAKE SURE YOU RUN `yarn build` BEFORE DEPLOYING THIS APP ON BARE METAL

<hr>

### Copy configuration
You first need to copy configuration from `./apache-config/httpd.conf` to `/etc/apache2/apache2.conf`

### Copy static files
`cp -r ./build/* /var/www/html/`
