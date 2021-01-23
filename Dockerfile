FROM nginx:1.19.3-alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
COPY run.sh /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/run.sh
EXPOSE 80
CMD /docker-entrypoint.d/run.sh && nginx -g 'daemon off;'