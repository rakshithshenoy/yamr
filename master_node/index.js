const express = require("express");
const app = express();
const axios = require("axios");

const fileUpload = require("express-fileupload");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.post("/masterfile", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let uploadedFile = req.files.masterfile;
      await uploadedFile.mv("./tempstorage/" + uploadedFile.name);

      const meta = {
        name: uploadedFile.name,
        type: uploadedFile.type,
        mime: uploadedFile.mimetype,
        size: uploadedFile.size,
      };
      const contents = fs.readFileSync(
        `./tempstorage/${uploadedFile.name}`,
        "utf-8"
      );

      const arr = contents.split(/\r?\n/);
      arr.sort();
      const distinctArr = [...new Set(arr)];
      const size = distinctArr.length;
      const dkeys = Math.floor(size / 3);
      const arr1 = [];
      const arr2 = [];
      const arr3 = [];

      let iter = 1;
      let count = 1;

      for (let index = 0; index < arr.length; index++) {
        if (iter == 1) {
          if (arr[index] != arr[index + 1]) {
            count += 1;
          }
          arr1.push(arr[index]);

          if (count == dkeys + 1) {
            count = 1;
            iter++;
          }
        } else if (iter == 2) {
          if (arr[index] != arr[index + 1]) {
            count += 1;
          }
          arr2.push(arr[index]);

          if (count == dkeys + 1) {
            count = 1;
            iter++;
          }
        } else if (iter == 3) {
          arr3.push(arr[index]);
        }
      }

      axios.post("http://yet_another_map_reduce-worker_node-1-1:5000/data", {
        arr: arr1,
        name: uploadedFile.name,
        num: 1,
      });
      axios.post("http://yet_another_map_reduce-worker_node-2-1:5000/data", {
        arr: arr2,
        name: uploadedFile.name,
        num: 2,
      });
      axios.post("http://yet_another_map_reduce-worker_node-3-1:5000/data", {
        arr: arr3,
        name: uploadedFile.name,
        num: 3,
      });
      fs.unlinkSync(`./tempstorage/${uploadedFile.name}`);
      res.status(200).json(arr);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/splitnormal", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      const metadata = JSON.parse(
        fs.readFileSync(`./metadata/metadata.txt`, "utf-8")
      );

      let uploadedFile = req.files.masterfile;

      let flag = 0;
      if (metadata.length > 0) {
        metadata.map((el) => {
          if (el.name == uploadedFile.name) {
            res
              .status(400)
              .json({ message: "A file with this name already exists" });
            flag = 1;
          }
        });
      }
      if (flag)
        return res
          .status(400)
          .json({ message: "A file with this name already exists!" });

      const meme = {
        name: uploadedFile.name,
        type: uploadedFile.type,
        mime: uploadedFile.mimetype,
        size: uploadedFile.size,
        splits: 3,
      };

      metadata.push(meme);
      const d = JSON.stringify(metadata);

      fs.writeFileSync("./metadata/metadata.txt", d);

      await uploadedFile.mv("./tempstorage/" + uploadedFile.name);

      const contents = fs.readFileSync(
        `./tempstorage/${uploadedFile.name}`,
        "utf-8"
      );

      const arr = contents.split(/\r?\n/);

      const dkeys = Math.floor(arr.length / 3);
      const arr1 = arr.slice(0, dkeys);
      const arr2 = arr.slice(dkeys, 2 * dkeys);
      const arr3 = arr.slice(2 * dkeys);

      axios.post("http://yet_another_map_reduce-worker_node-1-1:5000/data", {
        arr: arr1,
        name: uploadedFile.name,
        num: 1,
      });
      axios.post("http://yet_another_map_reduce-worker_node-2-1:5000/data", {
        arr: arr2,
        name: uploadedFile.name,
        num: 2,
      });
      axios.post("http://yet_another_map_reduce-worker_node-3-1:5000/data", {
        arr: arr3,
        name: uploadedFile.name,
        num: 3,
      });
      res.status(200).json(arr);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/read/:name", async (req, res) => {
  try {
    let name = req.params.name;

    const metadata = JSON.parse(
      fs.readFileSync(`./metadata/metadata.txt`, "utf-8")
    );
    let flag;
    if (metadata.length > 0) {
      metadata.map((el) => {
        if (el.name == name) {
          flag = 1;
        }
      });
    }
    if (flag) {
      const response1 = await axios.post(
        "http://yet_another_map_reduce-worker_node-1-1:5000/read",
        {
          name: name.slice(0, -4),
          num: 1,
        }
      );

      const response2 = await axios.post(
        "http://yet_another_map_reduce-worker_node-2-1:5000/read",
        {
          name: name.slice(0, -4),
          num: 2,
        }
      );
      const response3 = await axios.post(
        "http://yet_another_map_reduce-worker_node-3-1:5000/read",
        {
          name: name.slice(0, -4),
          num: 3,
        }
      );
      let arr = [
        ...response1.data.arr,
        ...response2.data.arr,
        ...response3.data.arr,
      ];

      res.status(200).json({ array: arr });
    } else {
      res.status(501).send(err);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/mapper/:name", async (req, res) => {
  try {
    let name = req.params.name;
    console.log(name);

    const metadata = JSON.parse(
      fs.readFileSync(`./metadata/metadata.txt`, "utf-8")
    );
    let flag;
    if (metadata.length > 0) {
      console.log("Entered the if");
      metadata.map((el) => {
        if (el.name == name) {
          flag = 1;
        }
      });
    }
    if (flag) {
      const response1 = await axios.post(
        "http://yet_another_map_reduce-worker_node-1-1:5000/mapper",
        {
          name: name.slice(0, -4),
          num: 1,
        }
      );

      const response2 = await axios.post(
        "http://yet_another_map_reduce-worker_node-2-1:5000/mapper",
        {
          name: name.slice(0, -4),
          num: 2,
        }
      );
      const response3 = await axios.post(
        "http://yet_another_map_reduce-worker_node-3-1:5000/mapper",
        {
          name: name.slice(0, -4),
          num: 3,
        }
      );
      let arr = [
        ...response1.data.mappedArr,
        ...response2.data.mappedArr,
        ...response3.data.mappedArr,
      ];
      const mappedData = JSON.stringify(arr);
      const f = fs.writeFileSync(
        `./tempstorage/${name.slice(0, -4)}-mapper.txt`,
        mappedData
      );

      res.status(200).json({ array: arr });
    } else {
      res.status(501).send(err);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/shuffle/:name", (req, res) => {
  try {
    const { name } = req.params;

    const file = fs.readFileSync(
      `./tempstorage/${name.slice(0, -4)}-mapper.txt`
    );

    const data = JSON.parse(file);

    const compare = (a, b) => {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    };

    data.sort(compare);
    console.log(data);
    // res.status(200).json({ array: data });

    const distinctArr = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
    const size = distinctArr.length;
    const dkeys = Math.floor(size / 3);
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];

    let iter = 1;
    let count = 1;

    for (let index = 0; index < data.length; index++) {
      if (iter == 1) {
        if (data[index].key != data[index + 1].key) {
          count += 1;
        }
        arr1.push(data[index]);

        if (count == dkeys + 1) {
          count = 1;
          iter++;
        }
      } else if (iter == 2) {
        if (data[index].key != data[index + 1].key) {
          count += 1;
        }
        arr2.push(data[index]);

        if (count == dkeys + 1) {
          count = 1;
          iter++;
        }
      } else if (iter == 3) {
        arr3.push(data[index]);
      }
    }
    axios.post(
      "http://yet_another_map_reduce-worker_node-1-1:5000/shuffledata",
      {
        arr: arr1,
        name: name,
        num: 1,
      }
    );
    axios.post(
      "http://yet_another_map_reduce-worker_node-2-1:5000/shuffledata",
      {
        arr: arr2,
        name: name,
        num: 2,
      }
    );
    axios.post(
      "http://yet_another_map_reduce-worker_node-3-1:5000/shuffledata",
      {
        arr: arr3,
        name: name,
        num: 3,
      }
    );

    res.status(200).json({ array1: arr1, array2: arr2, array3: arr3 });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/reducer/:name", async (req, res) => {
  try {
    let name = req.params.name;

    const metadata = JSON.parse(
      fs.readFileSync(`./metadata/metadata.txt`, "utf-8")
    );
    let flag;
    if (metadata.length > 0) {
      metadata.map((el) => {
        if (el.name == name) {
          flag = 1;
        }
      });
    }
    if (flag) {
      const response1 = await axios.post(
        "http://yet_another_map_reduce-worker_node-1-1:5000/reducer",
        {
          name: name.slice(0, -4),
          num: 1,
        }
      );

      const response2 = await axios.post(
        "http://yet_another_map_reduce-worker_node-2-1:5000/reducer",
        {
          name: name.slice(0, -4),
          num: 2,
        }
      );
      const response3 = await axios.post(
        "http://yet_another_map_reduce-worker_node-3-1:5000/reducer",
        {
          name: name.slice(0, -4),
          num: 3,
        }
      );
      let arr = [
        ...response1.data.reducedArr,
        ...response2.data.reducedArr,
        ...response3.data.reducedArr,
      ];
      const reducedData = JSON.stringify(arr);
      fs.writeFileSync(
        `./tempstorage/${name.slice(0, -4)}-mapper.txt`,
        reducedData
      );

      res.status(200).json({ array: arr });
    } else {
      res.status(501).send(err);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(2000, () => {
  console.log(`Server listening on port 2000`);
});
