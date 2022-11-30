const path = require("path");
const fs = require("fs");

exports.reducer = (name, num) => {
  const data = fs.readFileSync(
    path.resolve(__dirname, `${name}-shuffled-${num}.txt`)
  );
  const arr = JSON.parse(data);

  const reducedArr = [];
  let count = 1;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].key != arr[i + 1].key) {
      const obj = {
        key: arr[i].key,
        count,
      };
      reducedArr.push(obj);
      count = 1;
    } else {
      count++;
    }
  }

  if (count > 1) {
    const obj = {
      key: arr[arr.length - 1].key,
      count,
    };
    reducedArr.push(obj);
  } else {
    const obj = {
      key: arr[arr.length - 1].key,
      count: 1,
    };
    reducedArr.push(obj);
  }

  const reducedData = JSON.stringify(reducedArr);
  fs.writeFileSync(
    path.resolve(__dirname, `${name}-reduced-${num}.txt`),
    reducedData
  );

  return reducedArr;
};
