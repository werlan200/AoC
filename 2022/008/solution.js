const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

const mapped = input.map((line) => line.split("").map(Number));

const x = mapped[0].length;
const y = mapped.length;

const columnsArr = Array.from({ length: x }, (_, i) =>
  mapped.map((row) => row[i])
);

const checkFromRight = (arr, columnIndex) => {
  return arr.slice(columnIndex + 1);
};

const checkFromLeft = (arr, columnIndex) => {
  return arr.slice(0, columnIndex);
};

let visibleTrees = 0;

function checkArray(treeHeight, rightRow, leftRow, upColumn, downColumn) {
  const arrays = [...arguments].slice(1);
  for (let x of arrays) {
    if (!x.length) {
      visibleTrees++;
      break;
    }

    if (treeHeight > Math.max(...x)) {
      visibleTrees++;
      break;
    }
  }
}

const getCountTillMatchOrEnd = (treeHeight, arr) => {
  if (!arr.length) return 0;

  const foundIndex = arr.findIndex((ele) => ele >= treeHeight);
  return foundIndex === -1 ? arr.length : foundIndex + 1;
};

function checkArray2(treeHeight, rightRow, leftRow, upColumn, downColumn) {
  const arrays = [...arguments].slice(1);

  return arrays
    .map((arr, i) =>
      i % 2 === 0
        ? getCountTillMatchOrEnd(treeHeight, arr)
        : getCountTillMatchOrEnd(treeHeight, arr.reverse())
    )
    .reduce((scenicScore, distance) => scenicScore * distance);
}

const resultTwoArr = [];

mapped.forEach((row, rowIndex) => {
  row.forEach((columnItem, columnIndex) => {
    const rightRow = checkFromRight(mapped[rowIndex], columnIndex);
    const leftRow = checkFromLeft(mapped[rowIndex], columnIndex);
    const upColumn = checkFromRight(columnsArr[columnIndex], rowIndex);
    const downColumn = checkFromLeft(columnsArr[columnIndex], rowIndex);

    checkArray(columnItem, rightRow, leftRow, upColumn, downColumn);
    const scenicScore = checkArray2(
      columnItem,
      rightRow,
      leftRow,
      upColumn,
      downColumn
    );
    if (scenicScore) {
      resultTwoArr.push(scenicScore);
    }
    checkArray2(columnItem, rightRow, leftRow, upColumn, downColumn);
  });
});

//Part One Resut
console.log(visibleTrees);
//Part Two Result
console.log(Math.max(...resultTwoArr));
