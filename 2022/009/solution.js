const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

//For Part One:
const tail = [500, 500];
const head = [500, 500];
//For Part Two:
let rope = {
  0: [500, 500],
  9: [500, 500],
  1: [500, 500],
  2: [500, 500],
  3: [500, 500],
  4: [500, 500],
  5: [500, 500],
  6: [500, 500],
  7: [500, 500],
  8: [500, 500],
};

const uniquePositions = [[500, 500]];

const move = (direction, arr) => {
  switch (direction) {
    case "U":
      arr[1] += 1;
      break;
    case "R":
      arr[0] += 1;
      break;
    case "D":
      arr[1] -= 1;
      break;
    case "L":
      arr[0] -= 1;
      break;
    case "upRight":
      arr[0] += 1;
      arr[1] += 1;
      break;
    case "upLeft":
      arr[0] -= 1;
      arr[1] += 1;
      break;
    case "downLeft":
      arr[0] -= 1;
      arr[1] -= 1;
      break;
    case "downRight":
      arr[0] += 1;
      arr[1] -= 1;
      break;
  }
};

const getAngle = (head, tail) =>
  (Math.atan2(head[1] - tail[1], head[0] - tail[0]) * 180) / Math.PI;

const isAdjacent = (head, tail) => {
  const distance = Math.hypot(head[0] - tail[0], head[1] - tail[1]);

  if (distance === 1.4142135623730951 || distance === 1 || distance === 0)
    return true;

  return false;
};

const getTailDirection = (head, tail) => {
  const angle = getAngle(head, tail);

  const upRight = angle > 0 && angle < 90 && "upRight";
  const upLeft = angle > 90 && angle < 180 && "upLeft";
  const downLeft = angle > -180 && angle < -90 && "downLeft";
  const downRight = angle > -90 && angle < 0 && "downRight";

  const right = angle === 0 && "R";
  const up = angle === 90 && "U";
  const left = angle === 180 && "L";
  const down = angle === -90 && "D";

  return (
    upRight || upLeft || downLeft || downRight || up || right || left || down
  );
};

const checkIfAlreadyExist = (tail) => {
  const foundIndex = uniquePositions.findIndex(
    (position) => position[0] === tail[0] && position[1] === tail[1]
  );

  if (foundIndex === -1) {
    uniquePositions.push([tail[0], tail[1]]);
  }
};

// input.forEach((command) => {
//   const [direction, times] = command.split(" ");

//   for (let i = 0; i < Number(times); i++) {
//     move(direction, head);
//     if (isAdjacent(head, tail)) continue;

//     const tailDirection = getTailDirection(head, tail);
//     move(tailDirection, tail);

//     checkIfAlreadyExist(tail);
//   }
// });

input.forEach((command) => {
  const [direction, times] = command.split(" ");

  for (let i = 0; i < Number(times); i++) {
    Object.keys(rope).forEach((ele, j) => {
      if (j === 0) {
        move(direction, rope[j]);
        return;
      }

      if (isAdjacent(rope[j - 1], rope[j])) return;

      const tailDirection = getTailDirection(rope[j - 1], rope[j]);
      move(tailDirection, rope[j]);

      checkIfAlreadyExist(rope[9]);
    });
  }
});

//Toggle input.forEach()s to get answers of Part One & Two:
console.log(uniquePositions.length);
