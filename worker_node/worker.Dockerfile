FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
VOLUME [ "data:/app/data" ]
COPY . /app/
CMD [ "node", "index.js" ]