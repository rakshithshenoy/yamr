const fs = require("fs");
const path = require("path");

module.exports.mapper = function (name, num) {
  console.log("INNSIDE MAPPER FUNCTION");
  console.log(__dirname);
  console.log(name, num);
  const data = fs.readFileSync(path.resolve(__dirname, `${name}-${num}.txt`));
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
  fs.writeFileSync(
    path.resolve(__dirname, `${name}-mapper-${num}.js`),
    mappedData
  );
  console.log("DATA WRITTEN");

  return mappedArr

};
