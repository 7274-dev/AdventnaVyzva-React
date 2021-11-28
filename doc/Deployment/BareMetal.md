# Deployment - Bare metal

<hr>

MAKE SURE YOU RUN `yarn build` BEFORE DEPLOYING THIS APP ON BARE METAL

<hr>

### Copy static files
`cp -r ./build/* /var/www/html/`

### Do some black magic apache fuckery
`cp ./apache-config/bare-metal.conf /etc/apache2/sites-available/vyzva.conf`
<br>
`a2enmod rewrite`
<br>
`a2ensite vyzva.conf`

### Restart apache
`systemctl restart apache2`
