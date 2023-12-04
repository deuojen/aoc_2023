import { FileHelper } from '../filehelper';

const folderPath = '4';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotal = 0;

var digitReg = /^\d+$/;

for (let index = 0; index < input1.length; index++) {
  const row = input1[index];

  const card = row.split(':');
  const games = card[1].split('|');

  const numbersLeft = games[0].split(' ').filter((i) => i);
  const numbersRight = games[1].split(' ').filter((i) => i);

  const filteredArray = numbersRight.filter((value) =>
    numbersLeft.includes(value)
  );

  let currentNumber = 0;
  if (filteredArray.length > 0) {
    currentNumber = 1;
  }
  if (filteredArray.length > 1) {
    for (let x = 1; x < filteredArray.length; x++) {
      currentNumber = times2(currentNumber);
    }
  }

  maxTotal += currentNumber;
}

function times2(n: number): number {
  return n * 2;
}

console.log('first part :' + maxTotal);
//22897

//part 2

let maxTotal2: number = 0;
let numbers: Array<number> = [];

input1.forEach((row, i) => {
  numbers.push(1);
});

input1.forEach((row, i) => {
  const card = row.split(':');
  const games = card[1].split('|');

  const numbersLeft = games[0].split(' ').filter((i) => i);
  const numbersRight = games[1].split(' ').filter((i) => i);

  const filteredArray = numbersRight.filter((value) =>
    numbersLeft.includes(value)
  );

  for (let index = 1; index <= filteredArray.length; index++) {
    const nextNumber = index + i;
    if (nextNumber < input1.length + 1) {
      numbers[nextNumber] += 1;
    }
  }

  if (i != 0 || i != input1.length - 1) {
    const copies = numbers[i] - 1;
    for (let x = 0; x < copies; x++) {
      for (let index = 1; index <= filteredArray.length; index++) {
        const nextNumber = index + i;
        if (nextNumber < input1.length + 1) {
          numbers[nextNumber] += 1;
        }
      }
    }
  }
});

console.log(
  'second part :' + numbers.reduce((sum, current) => sum + current, 0)
);
// 5095824
