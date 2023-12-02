import { FileHelper } from '../filehelper';

const folderPath = '2';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotal = 0;

const redLimit = 12;
const greenLimit = 13;
const blueLimit = 14;

for (let index = 0; index < input1.length; index++) {
  const line = input1[index];

  const game = line.split(':');
  const sets = game[1].split(';');
  //const cubes = game[1].split(/;|,/);

  const gameNumber = Number(game[0].replace('Game ', ''));
  //console.log(gameNumber);
  let setValid = true;

  sets.forEach((set) => {
    const setCubes = set.split(',');

    setCubes.forEach((cube) => {
      let currentRed = 0;
      let currentGreen = 0;
      let currentBlue = 0;

      //console.log(cube);
      if (cube.indexOf('red') > -1) {
        const redNumber = Number(cube.replace(' red', ''));
        currentRed = redNumber;
      }
      if (cube.indexOf('green') > -1) {
        const greenNumber = Number(cube.replace(' green', ''));
        currentGreen = greenNumber;
      }
      if (cube.indexOf('blue') > -1) {
        const blueNumber = Number(cube.replace(' blue', ''));
        currentBlue = blueNumber;
      }

      if (
        currentRed > redLimit ||
        currentGreen > greenLimit ||
        currentBlue > blueLimit
      ) {
        setValid = false;
        return;
      }
    });
    if (!setValid) {
      return;
    }
  });

  if (setValid) {
    maxTotal += gameNumber;
  }
}

//console.log(currentTotal);
console.log('first part :' + maxTotal);
//2162

let maxTotal2 = 0;

for (let index = 0; index < input1.length; index++) {
  const line = input1[index];

  const game = line.split(':');
  const sets = game[1].split(';');
  const cubes = game[1].split(/;|,/);

  //const gameNumber = Number(game[0].replace('Game ', ''));

  let currentRedLimit = 0;
  let currentGreenLimit = 0;
  let currentBlueLimit = 0;

  cubes.forEach((cube) => {
    //console.log(cube);
    if (cube.indexOf('red') > -1) {
      const redNumber = Number(cube.replace(' red', ''));
      currentRedLimit =
        currentRedLimit < redNumber ? redNumber : currentRedLimit;
    }
    if (cube.indexOf('green') > -1) {
      const greenNumber = Number(cube.replace(' green', ''));
      currentGreenLimit =
        currentGreenLimit < greenNumber ? greenNumber : currentGreenLimit;
    }
    if (cube.indexOf('blue') > -1) {
      const blueNumber = Number(cube.replace(' blue', ''));
      currentBlueLimit =
        currentBlueLimit < blueNumber ? blueNumber : currentBlueLimit;
    }
  });

  maxTotal2 += currentRedLimit * currentGreenLimit * currentBlueLimit;
}

console.log('second part :' + maxTotal2);
// 72513
