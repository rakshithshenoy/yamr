FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
VOLUME [ "data3:/app/data3" ]
VOLUME ["~/projects/yet_another_map_reduce/worker_node/data3:/app/data3"]
COPY . /app/
CMD [ "node", "index.js" ]