FROM nginx

COPY .htpasswd /etc/nginx/.htpasswd

# delete default nginx config
RUN rm /etc/nginx/nginx.conf

# copy our new nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy our html files to server
COPY *.html /etc/nginx/html/

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

####### DONE WITH STUFF IN STATIC #########

# Create assets dir
RUN mkdir /etc/nginx/html/assets/
WORKDIR /etc/nginx/html/assets/

# Move over videos
RUN mkdir video
WORKDIR video
COPY ./assets/video/* ./

# Go back to assets dir
WORKDIR ..

# Move over fonts
RUN mkdir audio
WORKDIR audio
COPY ./assets/audio/* ./

EXPOSE 80
