FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
EXPOSE 2000
VOLUME [ "metadata:/app/metadata" ]
CMD [ "node", "index.js" ]