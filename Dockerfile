FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs
COPY build .
COPY apache-config/docker-htaccess .htaccess

COPY apache-config/docker.conf /httpd.conf

RUN cat /httpd.conf >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80
