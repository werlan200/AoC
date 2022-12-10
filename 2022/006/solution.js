const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

const datastream = input[0];

let i = 0;
let result;

//For part one answer change fourteens to fours.
while (i < datastream.length) {
  if (new Set(datastream.slice(i, i + 14)).size === 14) {
    result = i + 14;
    break;
  }
  i++;
}
