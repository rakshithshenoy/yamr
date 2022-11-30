FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
RUN npm install -g nodemon
VOLUME [ "data3:/app/data3" ]
VOLUME ["~/projects/yet_another_map_reduce/worker_node/data3:/app/data3"]
COPY . /app/
CMD [ "npm", "start" ]