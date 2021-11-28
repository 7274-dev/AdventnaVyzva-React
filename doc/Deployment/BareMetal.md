# Deployment - Bare metal

<hr>

MAKE SURE YOU RUN `yarn build` BEFORE DEPLOYING THIS APP ON BARE METAL

<hr>

### Copy configuration
`cat ./apache-configuration/httpd.conf >> /etc/apache2/apache2.conf`

### Copy static files
`cp -r ./build/* /var/www/html/`
