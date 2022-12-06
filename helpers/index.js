var fs = require("fs");
const path = require("path");

const fetchDataLines = (dirName) => {
  return fs
    .readFileSync(path.resolve(dirName, "data.txt"), {
      encoding: "utf8",
      flag: "r",
    })
    .trim()
    .split(/\r?\n/);
};

module.exports = {
  fetchDataLines,
};
