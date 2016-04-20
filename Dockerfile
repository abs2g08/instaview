FROM node:argon

VOLUME ["/var/instaview"]
ADD start.sh /docker-start.sh
RUN chmod 755 /docker-start.sh
CMD ["/docker-start.sh"]
