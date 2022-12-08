const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

const stacks = {};

const emptySeperatorIndex = input.indexOf("");
const givenStacks = input.slice(0, emptySeperatorIndex);
const instructions = input.slice(emptySeperatorIndex + 1);

const numberOfStacksString = givenStacks.splice(-1)[0];
const numberOfStackStringLen = numberOfStacksString.length;

/**              Functions              */
const populateStack = (index) => {
  return givenStacks
    .map((row) => {
      const lengthDifference = numberOfStackStringLen - row.length;
      const sameLengthRow = " ".repeat(lengthDifference) + row;

      return sameLengthRow[index];
    })
    .filter((crate) => crate !== " ")
    .reverse();
};

const moveCrate = (from, to, howMany) => {
  let i = 0;
  while (i < howMany) {
    stacks[to].push(stacks[from].pop());
    i++;
  }
};

const moveCrateForPartTwo = (from, to, howMany) => {
  stacks[to].push(...stacks[from].splice(-howMany));
};

/**              Flow              */
numberOfStacksString.split("").forEach((char, i) => {
  if (char !== " ") {
    stacks[char] = populateStack(i);
  }
});

instructions.forEach((instruction) => {
  const instructionWords = instruction.split(" ");
  const howMany = instructionWords[1];
  const from = instructionWords[3];
  const to = instructionWords[5];

  moveCrate(from, to, howMany);
  // moveCrateForPartTwo(from, to, howMany);
});

//Toggle comments on moveCrate functions to get result for Part One & Two
const result = Object.values(stacks)
  .map((stack) => stack.slice(-1))
  .join("");
