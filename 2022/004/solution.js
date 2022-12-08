const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

/**               Commons              */
const getElvesPoints = (pair) =>
  pair
    .split(",")
    .map((elf) => elf.split("-"))
    .flat()
    .map(Number);

/**               Part One               */
const isFirstElfContains = (
  firstElfStart,
  firstElfEnd,
  secondElfStart,
  secondElfEnd
) => {
  if (secondElfStart >= firstElfStart && secondElfEnd <= firstElfEnd)
    return true;

  return false;
};

const isSecondElfContains = (
  firstElfStart,
  firstElfEnd,
  secondElfStart,
  secondElfEnd
) => {
  if (firstElfStart >= secondElfStart && firstElfEnd <= secondElfEnd)
    return true;

  return false;
};

const resultForFirstPart = input.reduce((assignments, pair) => {
  const [firstElfStart, firstElfEnd, secondElfStart, secondElfEnd] =
    getElvesPoints(pair);

  return (
    assignments +
    Number(
      isFirstElfContains(
        firstElfStart,
        firstElfEnd,
        secondElfStart,
        secondElfEnd
      ) ||
        isSecondElfContains(
          firstElfStart,
          firstElfEnd,
          secondElfStart,
          secondElfEnd
        )
    )
  );
}, 0);

/**               Part Two               */
const isOverlapExist = (
  firstElfStart,
  firstElfEnd,
  secondElfStart,
  secondElfEnd
) => {
  if (firstElfEnd < secondElfStart || firstElfStart > secondElfEnd)
    return false;

  return true;
};

const resultForSecondPart = input.reduce((overlaps, pair) => {
  const [firstElfStart, firstElfEnd, secondElfStart, secondElfEnd] =
    getElvesPoints(pair);

  return (
    overlaps +
    Number(
      isOverlapExist(firstElfStart, firstElfEnd, secondElfStart, secondElfEnd)
    )
  );
}, 0);
