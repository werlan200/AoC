const { fetchDataLines } = require("../../helpers");
const input = fetchDataLines(__dirname);

/**              Functions              */
const getCurrentDirectory = (directoryArr, root) => {
  if (directoryArr.length === 1) return root;

  directoryArr.shift();

  return getCurrentDirectory(
    directoryArr,
    root.children.find((dir) => dir.id === directoryArr[0])
  );
};

const createDirectory = (newDirectoryId) => {
  const currentDirectoryChildren = getCurrentDirectory(
    [...currentDirectory],
    root
  ).children;

  currentDirectoryChildren.find((dir) => dir.id === newDirectoryId) ??
    currentDirectoryChildren.push({ id: newDirectoryId, children: [] });
};

const root = {
  id: "/",
  children: [],
};
const currentDirectory = ["/"];

const changeDirectory = (directory) => {
  switch (directory) {
    case "/":
      currentDirectory.splice(1);
      break;
    case "..":
      currentDirectory.pop();
      break;
    default:
      createDirectory(directory);
      currentDirectory.push(directory);
      break;
  }
};

const checkConsoleLine = (line) => {
  const splitLine = line.split(" ");
  switch (splitLine[0]) {
    case "$":
      if (splitLine[1] === "cd") {
        changeDirectory(splitLine[2]);
      }
      break;
    case "dir":
      break;
    default:
      //Line starts with number which ends up being a file
      getCurrentDirectory([...currentDirectory], root).children.push({
        id: splitLine[1],
        size: splitLine[0],
      });
      break;
  }
};
input.forEach((line) => checkConsoleLine(line));

/**                 Part One                */
let result = 0;

const setDirectorySizes = (dir) => {
  const dirSize = parseInt(dir.size);

  if (!dirSize) {
    const calculatedDirSize = dir.children.reduce((totalDirSize, child) => {
      return (
        totalDirSize +
        (child.size ? parseInt(child.size) : setDirectorySizes(child))
      );
    }, 0);

    dir.size = calculatedDirSize;
    if (calculatedDirSize <= 100000) {
      result += calculatedDirSize;
    }
    return calculatedDirSize;
  }

  if (dirSize <= 100000) {
    result += dirSize;
  }

  return dirSize;
};

setDirectorySizes(root);

/**                 Part Two                 */
const availableDiskSpace = 70000000;
const updateDiskSpace = 30000000;
const currentLeftDiskSpace = availableDiskSpace - root.size;
const diskSpaceToBeOpened = updateDiskSpace - currentLeftDiskSpace;

const possibleResultsForPartTwo = [];

const traverseDirectories = (dir, sizesOfDirsToBeDeleted) => {
  if (dir.size <= diskSpaceToBeOpened) return;

  sizesOfDirsToBeDeleted.push(dir.size);

  dir.children
    .filter((child) => child.children)
    .forEach((dir) => traverseDirectories(dir, sizesOfDirsToBeDeleted));
};

traverseDirectories(root, possibleResultsForPartTwo);
//Part Two Result:
Math.min(...possibleResultsForPartTwo);
