const express = require("express");
const app = express();
const fs = require("fs");
const fileUpload = require("express-fileupload");

// app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.post("/data", (req, res) => {
  try {
    const array = req.body.arr;
    const num = req.body.num;
    const name = req.body.name;
    const data = JSON.stringify(array);
    const f = fs.writeFileSync(
      `./data${num}/${name.slice(0, -4)}-${num}.txt`,
      data
    );
    return res.status(200).json({ message: "Written successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/shuffledata", (req, res) => {
  try {
    const array = req.body.arr;
    const num = req.body.num;
    const name = req.body.name;
    const data = JSON.stringify(array);
    const f = fs.writeFileSync(
      `./data${num}/${name.slice(0, -4)}-shuffled-${num}.txt`,
      data
    );
    return res.status(200).json({ message: "Written successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/read", (req, res) => {
  try {
    const num = req.body.num;

    const data = fs.readFileSync(`/app/data${num}/${req.body.name}-${num}.txt`);

    const arr = JSON.parse(data);
    res.status(200).json({ arr });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/uploadfiles", (req, res) => {
  console.log("REQUEST", req.body);
  const { name, num } = req.body;
  const { mapper, reducer } = req.files;

  // const reducer = req.files.reducer.data;
  // const mapper = req.files.mapper.data;
  fs.writeFileSync(`./data${num}/mapper-${name}.js`, mapper.data);
  fs.writeFileSync(`./data${num}/reducer-${name}.js`, reducer.data);

  res.status(200).json({ message: "Wrote mapper and reducer" });
});

app.post("/mapper", (req, res) => {
  try {
    const num = req.body.num;
    const name = req.body.name;
    const { mapper } = require(`./data${num}/mapper-${name}.js`);

    console.log("INSIDE MAPPER2");
    const mappedArr = mapper(name, num);

    res.status(200).json({ mappedArr });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/reducer", (req, res) => {
  try {
    const num = req.body.num;
    const name = req.body.name;
    const { reducer } = require(`./data${num}/reducer-${name}.js`);

    console.log("INSIDE REDUCER2");
    const reducedArr = reducer(name, num);

    res.status(200).json({ reducedArr });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(5000, () => {
  console.log(`Worker listening`);
});


// app.post("/mapper", (req, res) => {
//   try {
//     const num = req.body.num;
//     const name = req.body.name;
//     const data = fs.readFileSync(`/app/data${num}/${name}-${num}.txt`);
//     const arr = JSON.parse(data);
//     let mappedArr = arr.map((ele) => {
//       let obj = {
//         key: `${ele}`,
//         value: 1,
//       };
//       return obj;
//     });
//     const mappedData = JSON.stringify(mappedArr);
//     const f = fs.writeFileSync(
//       `./data${num}/${name}-mapper-${num}.txt`,
//       mappedData
//     );

//     res.status(200).json({ mappedArr });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });



// app.post("/reducer", (req, res) => {
//   try {
//     const num = req.body.num;
//     const name = req.body.name;
//     const data = fs.readFileSync(`/app/data${num}/${name}-shuffled-${num}.txt`);
//     const arr = JSON.parse(data);

//     const reducedArr = [];
//     let count = 1;
//     for (let i = 0; i < arr.length - 1; i++) {
//       if (arr[i].key != arr[i + 1].key) {
//         const obj = {
//           key: arr[i].key,
//           count,
//         };
//         reducedArr.push(obj);
//         count = 1;
//       } else {
//         count++;
//       }
//     }

//     if (count > 1) {
//       const obj = {
//         key: arr[arr.length - 1].key,
//         count,
//       };
//       reducedArr.push(obj);
//     } else {
//       const obj = {
//         key: arr[arr.length - 1].key,
//         count: 1,
//       };
//       reducedArr.push(obj);
//     }

//     const reducedData = JSON.stringify(reducedArr);
//     fs.writeFileSync(`./data${num}/${name}-reduced-${num}.txt`, reducedData);

//     res.status(200).json({ reducedArr });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


