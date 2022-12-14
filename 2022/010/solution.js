const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname).map((instruction) =>
  instruction.split(" ")
);

let x = 1;
let cycle = 1;

const signalStrengthCycles = [20, 60, 100, 140, 180, 220];
const calculatedSignalStrength = [];

const setCycle = (times) => {
  if (!times) return;
  if (signalStrengthCycles.includes(cycle)) {
    calculatedSignalStrength.push(cycle * x);
  }
  cycle++;
  return setCycle(times - 1);
};

input.forEach((instruction) => {
  const instructionType = instruction[0];
  if (instructionType === "noop") {
    setCycle(1);
    return;
  }
  if (instructionType === "addx") {
    setCycle(2);
    x += parseInt(instruction[1]);
    return;
  }
});
//Part One result:
calculatedSignalStrength.reduce((acc, signalStr) => acc + signalStr, 0);

/**             Part Two             */
let middleOfSprite = 1;
let cycle2 = 1;
let crt = "";

const drawCrt = () => {
  const crtIndex = crt.length % 40;
  if (
    crtIndex === middleOfSprite - 1 ||
    crtIndex === middleOfSprite ||
    crtIndex === middleOfSprite + 1
  ) {
    crt += "#";
  } else {
    crt += ".";
  }
};

const setCycle2 = (times) => {
  if (!times) return;
  drawCrt();
  cycle2++;
  return setCycle2(times - 1);
};

input.forEach((instruction) => {
  const instructionType = instruction[0];
  if (instructionType === "noop") {
    setCycle2(1);
    return;
  }
  if (instructionType === "addx") {
    setCycle2(2);
    middleOfSprite += parseInt(instruction[1]);
    return;
  }
});

//Part Two Answer
console.log(crt.slice(0, 40));
console.log(crt.slice(40, 80));
console.log(crt.slice(80, 120));
console.log(crt.slice(120, 160));
console.log(crt.slice(160, 200));
console.log(crt.slice(200));
