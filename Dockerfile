FROM nginx

COPY .htpasswd /etc/nginx/.htpasswd

# delete default nginx config
RUN rm /etc/nginx/nginx.conf

# copy our new nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy our html files and favicon to server
COPY *.html /etc/nginx/html/
COPY favicon.ico /etc/nginx/html/
COPY robots.txt /etc/nginx/html/

RUN chmod +r /etc/nginx/html/favicon.ico

# Create static directory
RUN mkdir /etc/nginx/html/static/
WORKDIR /etc/nginx/html/static/

# Copy over images
RUN mkdir img
WORKDIR img
COPY ./static/img/ ./

# Go back to static dir
WORKDIR ..

# Copy over css
RUN mkdir css
WORKDIR css
COPY ./static/css/ ./

# Go back to static dir
WORKDIR ..

# Copy over js
RUN mkdir js
WORKDIR js
COPY ./static/js/ ./

# Go back to static dir
WORKDIR ..

# Move over fonts
RUN mkdir fonts
WORKDIR fonts
COPY ./static/fonts/* ./

# Go back to static dir
WORKDIR ..

# Move over audio
RUN mkdir audio
WORKDIR audio
COPY ./static/audio/* ./

####### DONE WITH STUFF IN STATIC #########

EXPOSE 80
