import { FileHelper } from '../filehelper';

const folderPath = '9';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotal = 0;
let maxTotal2 = 0;

var digitReg = /^\d+$/;

for (let index = 0; index < input1.length; index++) {
  const row = input1[index];
  const numbers = row
    .split(' ')
    .filter((i) => i)
    .map((x) => +x);
  maxTotal += findNextNumber(numbers);
  maxTotal2 += findPrevNumber(numbers);
}

function findNextNumber(numbers: Array<number>): number {
  let lastNumbers: Array<number> = [];

  let loop = true;

  let prevOrder: Array<number> = numbers;
  lastNumbers.push(prevOrder[prevOrder.length - 1]);

  while (loop) {
    let currentDifs: Array<number> = [];
    for (let index = 0; index < prevOrder.length - 1; index++) {
      const dif = Number(prevOrder[index + 1]) - Number(prevOrder[index]);
      //console.log('check: ', prevOrder, dif, [index + 1], [index]);
      currentDifs.push(dif);
    }
    const allTotal = currentDifs.reduce((sum, current) => sum + current, 0);
    if (allTotal == 0) {
      loop = false;
      break;
    }

    prevOrder = currentDifs;
    lastNumbers.push(currentDifs[currentDifs.length - 1]);
    //console.log('lastNumber:', currentDifs[currentDifs.length - 1]);
  }
  //console.log(lastNumbers);
  return lastNumbers.reduce((sum, current) => sum + current, 0);
}

console.log('first part :' + maxTotal);
//16531

//part 2

function findPrevNumber(numbers: Array<number>): number {
  let firstNumbers: Array<number> = [];

  let loop = true;

  let prevOrder: Array<number> = numbers;
  firstNumbers.push(prevOrder[0]);

  while (loop) {
    let currentDifs: Array<number> = [];
    for (let index = 0; index < prevOrder.length - 1; index++) {
      const dif = Number(prevOrder[index + 1]) - Number(prevOrder[index]);
      //console.log('check: ', prevOrder, dif, [index + 1], [index]);
      currentDifs.push(dif);
    }
    const allTotal = currentDifs.reduce((sum, current) => sum + current, 0);
    if (allTotal == 0) {
      loop = false;
      break;
    }

    prevOrder = currentDifs;
    firstNumbers.push(currentDifs[0]);
  }
  console.log(firstNumbers.toString());

  let currentFirst = 0;
  for (let index = firstNumbers.length - 1; index > 0; index--) {
    currentFirst = firstNumbers[index] - currentFirst;
  }

  console.log(firstNumbers[0] - currentFirst);
  return firstNumbers[0] - currentFirst;
}

// console.log(
//   games2.sort((a, b) => 0 - (a.GameRank > b.GameRank ? 1 : -1)).toString()
// );

console.log('second part :' + maxTotal2);

// 250825971 --
