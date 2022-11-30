FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
RUN npm install -g nodemon
VOLUME [ "data1:/app/data1" ]
VOLUME ["~/projects/yet_another_map_reduce/worker_node/data1:/app/data1"]
COPY . /app/
CMD [ "npm", "start" ]