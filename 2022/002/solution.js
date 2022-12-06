const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

const points = {
  lose: 0,
  draw: 3,
  win: 6,
  X: 1,
  Y: 2,
  Z: 3,
};

const moveMap = {
  A: "X",
  B: "Y",
  C: "Z",
};

function getRoundTotalPoint(roundResult, move) {
  return points[move] + points[roundResult];
}

function getWinOrLose(elfMove, myMove) {
  if (
    (myMove === "X" && elfMove === "Z") ||
    (myMove === "Y" && elfMove === "X") ||
    (myMove === "Z" && elfMove === "Y")
  )
    return "win";

  return "lose";
}

function calculateResult(elfMove, myMove) {
  if (elfMove === myMove) return getRoundTotalPoint("draw", myMove);

  const roundResult = getWinOrLose(elfMove, myMove);
  return getRoundTotalPoint(roundResult, myMove);
}

//First Part Answer:
const totalScore = input.reduce((score, roundMoves) => {
  return score + calculateResult(moveMap[roundMoves[0]], roundMoves[2]);
}, 0);

const resultMap = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const guessMyMove = (elfMove, roundResult) => {
  switch (elfMove) {
    case "X":
      return roundResult === "win" ? "Y" : "Z";
    case "Y":
      return roundResult === "win" ? "Z" : "X";
    case "Z":
      return roundResult === "win" ? "X" : "Y";
  }
};

const calculateResultForPartTwo = (elfMove, roundResult) => {
  const roundResultString = resultMap[roundResult];

  if (roundResultString === "draw")
    return getRoundTotalPoint(roundResultString, elfMove);

  const guessedMove = guessMyMove(elfMove, roundResultString);
  return getRoundTotalPoint(roundResultString, guessedMove);
};

//Second Part Answer
const totalScoreForPartTwo = input.reduce((score, roundMoves) => {
  return (
    score + calculateResultForPartTwo(moveMap[roundMoves[0]], roundMoves[2])
  );
}, 0);
