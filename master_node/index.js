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

      console.log("dkeys", dkeys);

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

      // console.log(" ARR1");
      // console.log(arr1);
      // console.log(" ARR2");
      // console.log(arr2);
      // console.log(" ARR3");
      // console.log(arr3);

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
      console.log("File read");

      let flag = 0;
      if (metadata.length > 0) {
        console.log("Entered the if");
        metadata.map((el) => {
          if (el.name == uploadedFile.name) {
            res
              .status(400)
              .json({ message: "A file with this name already exists" });
            flag = 1;
          }
        });
      }
      console.log(metadata);
      console.log("File mapped");
      if (flag) return;

      console.log("skipped if");

      const meme = {
        name: uploadedFile.name,
        type: uploadedFile.type,
        mime: uploadedFile.mimetype,
        size: uploadedFile.size,
        splits: 3,
      };

      console.log("meta");
      console.log(meme);

      metadata.push(meme);
      const d = JSON.stringify(metadata);

      console.log(d);

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

app.listen(2000, () => {
  console.log(`Server listening on port 2000`);
});
