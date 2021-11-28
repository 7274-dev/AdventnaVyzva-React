FROM httpd:latest

COPY apache-configuration/httpd.conf /httpd.conf

RUN cat /httpd.conf >> /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs


COPY build .
RUN cat .htaccess
#CMD cat /usr/local/apache2/conf/httpd.conf


EXPOSE 80
