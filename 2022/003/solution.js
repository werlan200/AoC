const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

const getPriorityOfChar = (char) => {
  const asciiCode = char.charCodeAt(0);
  return asciiCode > 92 ? asciiCode - 96 : asciiCode - 38;
};

//First Part
const resultForPartOne = input.reduce((totalPriority, str) => {
  const strLen = str.length;
  const firstComp = str.slice(0, strLen / 2);
  const secondComp = str.slice(strLen / 2);

  for (const char of firstComp) {
    if (secondComp.indexOf(char) !== -1) {
      return totalPriority + getPriorityOfChar(char);
    }
  }
}, 0);

//Second Part
let resultForPartTwo = 0;

for (let i = 0; i < input.length; i = i + 3) {
  const elf1 = new Set([...input[i]]);
  const elf2 = new Set([...input[i + 1]]);
  const elf3 = new Set([...input[i + 2]]);

  resultForPartTwo += getPriorityOfChar(
    [...elf1].find((char) => elf2.has(char) && elf3.has(char))
  );
}
