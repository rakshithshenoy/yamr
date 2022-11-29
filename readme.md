- To view the contents of the folder within the docker container, run the following command
`sudo docker cp yet_another_map_reduce-worker_node-3-1:/app/data3 ~/projects/yet_another_map_reduce/worker_node`

---
# Routes
### Write Operation

On master node - 
  `POST /splitnormal` - Receives req.files.masterfile
On worker node - 
  `POST /data` - Receives req.body.arr req.body.num req.body.name


### Read Operation

On master node - 
  `GET /read/:name` - :name should be a file of the format hello.txt

On worker node - 
  `POST /read` - Receives req.body.num req.body.name


### Mapper

On master node -
`POST /mapper/:name` - :name should be a file of the format hello.txt

On worker node- 
`POST /mapper/` - req.body.name should be a file of the format hello

### Shuffling function(partition)

On master node -
`GET /shuffle/:name` - :name should be a file of the format hello.txt

On worker node -
`POST /shuffledata` - Receives req.body.arr req.body.num req.body.name
  
