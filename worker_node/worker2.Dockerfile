FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
VOLUME [ "data2:/app/data2" ]
VOLUME ["~/projects/yet_another_map_reduce/worker_node/data2:/app/data2"]
COPY . /app/
CMD [ "node", "index.js" ]