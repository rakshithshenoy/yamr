const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded());

app.post("/data", (req, res) => {
  try {
    console.log(req.body);
    const array = req.body.arr;
    const num = req.body.num;
    const name = req.body.name;
    const data = JSON.stringify(array);
    console.log("DATA", data, num, name);
    const f = fs.writeFileSync(
      `./data${num}/${name.slice(0, -4)}-${num}.txt`,
      data
    );
    console.log("WRITTEN", f);
    return res.status(200).json({ message: "Written successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/read", (req, res) => {
  try {
    const num = req.body.num;

    const data = fs.readFileSync(`/app/data${num}/${req.body.name}-${num}.txt`);

    console.log(data);
    const arr = JSON.parse(data);
    res.status(200).json({ arr });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log(`Worker listening`);
});
