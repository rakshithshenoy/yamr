FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
EXPOSE 2000
VOLUME [ "metadata:/app/metadata" ]
VOLUME ["~/projects/yet_another_map_reduce/master_node/metadata:/app/metadata"]
CMD [ "node", "index.js" ]