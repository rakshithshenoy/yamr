FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
VOLUME [ "data1:/app/data1" ]
VOLUME ["~/projects/yet_another_map_reduce/worker_node/data1:/app/data1"]
COPY . /app/
CMD [ "node", "index.js" ]