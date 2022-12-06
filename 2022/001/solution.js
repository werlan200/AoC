const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

const elfArray = input.reduce(
  (array, cal) => {
    if (cal) {
      array[array.length - 1].push(cal);
    } else {
      array.push([]);
    }
    return array;
  },
  [[]]
);

const getTotalBagCal = (bagArray) => {
  return bagArray.reduce((totalCal, cal) => totalCal + parseInt(cal), 0);
};

const totalBagCalArray = elfArray.map((bag) => getTotalBagCal(bag));
const topThreeCals = totalBagCalArray.sort((a, b) => b - a).slice(0, 3);

/** Part One Solution
 * 
 * 
    var maxCal = 0;
    var currentCal = 0;
    for (const cal of input) {
    if (cal) {
        currentCal += parseInt(cal);
    } else {
        if (currentCal > maxCal) {
        maxCal = currentCal;
        }
        currentCal = 0;
    }
    }
 */
