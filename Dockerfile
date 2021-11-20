FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs
COPY build .

EXPOSE 80
