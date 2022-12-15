const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname).filter((line) => line !== "");

const monkeys = [];
const answerForPartTwo = true;
const roundLimit = answerForPartTwo ? 10000 : 20;
let partTwoDealingWithStress;

const findIndexInStr = (str, searchStr) => {
  return str.indexOf(searchStr);
};

const modParser = {
  0: (line) => Number(line.slice(-2)[0]),
  1: (line) => {
    const index = findIndexInStr(line, ":") + 2;
    return line
      .slice(-(line.length - index))
      .split(", ")
      .map(Number);
  },
  2: (line) => {
    const index = findIndexInStr(line, "old") + 4;
    return line.slice(-(line.length - index)).split(" ");
  },
  3: (line) => Number(line.slice(-2).trim()),
  4: (line) => Number(line.slice(-1)),
  5: (line) => Number(line.slice(-1)),
};

function Monkey(items, operationArr, divisibleBy, ifTrue, ifFalse) {
  this.items = items;
  this.operationArr = operationArr;
  this.divisibleBy = divisibleBy;
  this.ifTrue = ifTrue;
  this.ifFalse = ifFalse;
  this.currentWorryLevel = null;
  this.inspectionNumber = 0;

  this.operateParser = function (worryLevel) {
    const [operationType, secondOperator] = this.operationArr;

    return eval(
      worryLevel +
        operationType +
        `${secondOperator === "old" ? worryLevel : secondOperator}`
    );
  };

  this.calculateCurrentWorryLevel = function () {
    const notCalculatedWorryLevel = this.items.shift();
    const operatedWorryLevel = this.operateParser(notCalculatedWorryLevel);
    this.currentWorryLevel = answerForPartTwo
      ? operatedWorryLevel % partTwoDealingWithStress
      : Math.floor(operatedWorryLevel / 3);
  };

  this.test = function () {
    const isDivisible = this.currentWorryLevel % this.divisibleBy === 0;

    monkeys[isDivisible ? this.ifTrue : this.ifFalse].items.push(
      this.currentWorryLevel
    );
  };

  this.doSingleTurn = function () {
    this.calculateCurrentWorryLevel();
    this.test();
    this.inspectionNumber = this.inspectionNumber + 1;
  };

  this.doRound = function () {
    if (this.items.length) {
      this.doSingleTurn();
      this.doRound();
    }
  };
}

input.forEach((line, i) => {
  const mod = i % 6;

  if (mod === 0) {
    const items = modParser[1](input[i + 1]);
    const operationArr = modParser[2](input[i + 2]);
    const divisibleBy = modParser[3](input[i + 3]);
    const ifTrue = modParser[4](input[i + 4]);
    const ifFalse = modParser[5](input[i + 5]);

    monkeys.push(new Monkey(items, operationArr, divisibleBy, ifTrue, ifFalse));
  }
});

partTwoDealingWithStress = monkeys.reduce(
  (pro, monkey) => pro * monkey.divisibleBy,
  1
);

let round = 1;
while (round <= roundLimit) {
  monkeys.forEach((monkey) => {
    monkey.doRound();
  });
  round++;
}

//Toggle "answerForPartTwo" on line 5 to get the correct result.
const result = monkeys
  .map((monkey) => monkey.inspectionNumber)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((acc, ele) => acc * ele, 1);
