const fs = require("fs");

module.exports.mapper = function (name, num) {
  console.log("INNSIDE MAPPER FUNCTION");
  console.log(__dirname);
  const data = fs.readFileSync(`./${name}-${num}.txt`);
  console.log("READ THE FILE");
  const arr = JSON.parse(data);
  let mappedArr = arr.map((ele) => {
    let obj = {
      key: `${ele}`,
      value: 1,
    };
    return obj;
  });
  console.log("DATA MAPPED");
  const mappedData = JSON.stringify(mappedArr);
  fs.writeFileSync(`./${name}-mapper-${num}.js`, mappedData);

  res.status(200).json({ mappedArr });
};
