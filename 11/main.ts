import { FileHelper } from '../filehelper';

const folderPath = '11';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

class Position {
  constructor(x: number, y: number) {
    this.xIndex = x;
    this.yIndex = y;
  }
  public xIndex: number;
  public yIndex: number;

  public toString = (): string => {
    return `x${this.xIndex}y${this.yIndex}`;
  };
}

const main = () => {
  //part 1 - times 2
  var result = findSpaceRows();
  var replaced = findSpaceColums(result.inputArray, result.planetCounts);
  var seperated = getGalaxiesAndSpace(replaced);
  //console.log(seperated.spaces.toString());

  var total = getTotalDistance(1, seperated.spaces, seperated.planets);

  console.log('first part :' + total);
  // 10276166

  //part 2 - times 1000000
  var result2 = findSpaceRows();
  var replaced2 = findSpaceColums(result2.inputArray, result2.planetCounts);
  var seperated2 = getGalaxiesAndSpace(replaced2);
  var total2 = getTotalDistance(999999, seperated2.spaces, seperated2.planets);

  console.log('second part :' + total2);

  // 250825971 --
};

function findSpaceRows() {
  let inputArray: Array<string> = [];
  let planetCounts: Array<number> = [];
  // expand rows
  for (let index = 0; index < input1.length; index++) {
    const row = input1[index];

    if (row.indexOf('#') < 0) {
      inputArray.push(row.replace(/./g, 's'));
    } else {
      inputArray.push(row);
    }

    for (let i = 0; i < row.length; i++) {
      let currentNumber: number = row[i] === '#' ? 1 : 0;

      if (index == 0) {
        planetCounts.push(currentNumber);
      } else {
        planetCounts[i] = planetCounts[i] + currentNumber;
      }
    }
  }
  return {
    inputArray,
    planetCounts,
  };
}

function findSpaceColums(
  inputArray: Array<string>,
  planetCounts: Array<number>
) {
  //expand columns
  let emptyCount = 0;
  for (let pIndex = 0; pIndex < planetCounts.length; pIndex++) {
    const el = planetCounts[pIndex];
    if (el == 0) {
      emptyCount++;
      //console.log(pIndex);
      for (let i = 0; i < inputArray.length; i++) {
        const element = inputArray[i];
        inputArray[i] =
          element.slice(0, pIndex) + 's' + element.slice(pIndex + 1);
      }
    }
  }
  return inputArray;
}

function getGalaxiesAndSpace(inputArray: Array<string>) {
  let planets: Array<Position> = [];
  let spaces: Array<Position> = [];
  // get galaxies
  for (let index = 0; index < inputArray.length; index++) {
    const row = inputArray[index];

    for (let j = 0; j < row.length; j++) {
      const el = row[j];
      if (el == '.') {
        continue;
      }

      if (el == '#') {
        planets.push(new Position(j + 1, index + 1));
        //console.log('row: %s, galaxy:', row, planets.length, j, index);
        continue;
      }

      if (el == 's') {
        spaces.push(new Position(j + 1, index + 1));
        continue;
      }
    }
  }

  console.log(
    'planets :',
    planets.length,
    (planets.length * (planets.length - 1)) / 2
  );

  return { planets, spaces };
}

function getTotalDistanceOld(planets: Array<Position>) {
  let counter = 0;

  let total = 0;

  for (let i = 0; i < planets.length - 1; i++) {
    const current = planets[i];

    for (let j = i + 1; j < planets.length; j++) {
      const next = planets[j];

      let distance =
        Math.abs(current.xIndex - next.xIndex) +
        Math.abs(current.yIndex - next.yIndex);

      total += distance;
      counter++;
    }
  }

  console.log(counter);

  return total;
}

function getTotalDistance(
  multiplier: number,
  spaces: Array<Position>,
  planets: Array<Position>
) {
  let counter = 0;

  let total = 0;

  for (let i = 0; i < planets.length - 1; i++) {
    const current = planets[i];

    for (let j = i + 1; j < planets.length; j++) {
      const next = planets[j];

      let distance =
        Math.abs(current.xIndex - next.xIndex) +
        Math.abs(current.yIndex - next.yIndex);

      let minX = current.xIndex > next.xIndex ? next.xIndex : current.xIndex;
      let maxX = current.xIndex > next.xIndex ? current.xIndex : next.xIndex;

      let minY = current.yIndex > next.yIndex ? next.yIndex : current.yIndex;
      let maxY = current.yIndex > next.yIndex ? current.yIndex : next.yIndex;

      let spaceX =
        spaces.filter(
          (space) =>
            space.yIndex == current.yIndex &&
            space.xIndex > minX &&
            space.xIndex < maxX
        ).length * multiplier;
      let spaceY =
        spaces.filter(
          (space) =>
            space.xIndex == current.xIndex &&
            space.yIndex > minY &&
            space.yIndex < maxY
        ).length * multiplier;

      // console.log(
      //   'planet distances %d: %s, %d: %s, distance: %d',
      //   i + 1,
      //   current.toString(),
      //   j + 1,
      //   next.toString(),
      //   distance,
      //   spaceX,
      //   spaceY
      // );

      total += distance + spaceX + spaceY;
      counter++;
    }
  }

  console.log(counter);

  return total;
}

main();
