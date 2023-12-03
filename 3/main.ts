import { FileHelper } from '../filehelper';

const folderPath = '3';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotal = 0;

var digitReg = /^\d+$/;

for (let x = 0; x < input1.length; x++) {
  const row = input1[x];

  let newNumber = '';
  for (let k = 0; k < row.length; k++) {
    const col = row[k];
    //let numberStart = false;
    if (digitReg.test(col)) {
      newNumber += col + '';
    } else {
      let isValid = checkNumberIsValid(newNumber, x, k);
      if (isValid) {
        maxTotal += Number(newNumber);
      }
      //console.log('number: ' + newNumber + ', x: ' + x + ', k: ' + k);
      newNumber = '';
    }
  }
  if (Number(newNumber)) {
    let isValid = checkNumberIsValid(newNumber, x, row.length - 1);
    if (isValid) {
      maxTotal += Number(newNumber);
    }
  }
}

function checkNumberIsValid(
  s: string,
  rowIndex: number,
  colIndex: number
): boolean {
  // check right
  if (colIndex != input1[rowIndex].length - 1) {
    if (input1[rowIndex][colIndex] != '.') {
      return true;
    }
  }

  let colStart = colIndex - s.length - 1;

  // check left
  if (colStart > -1) {
    if (input1[rowIndex][colStart] != '.') {
      return true;
    }
  }

  let rowLength = s.length + 2;

  // check top row
  if (rowIndex != 0) {
    for (let x = 0; x < rowLength; x++) {
      const element = input1[rowIndex - 1][x + colStart];
      if (element != '.') {
        return true;
      }
    }
  }

  // check bottom row
  if (rowIndex != input1.length - 1) {
    for (let x = 0; x < rowLength; x++) {
      const element = input1[rowIndex + 1][x + colStart];
      if (element != '.') {
        return true;
      }
    }
  }

  return false;
}

console.log('first part :' + maxTotal);
//560670

//part 2

interface numberLocation {
  num: number;
  loc: string;
}

let maxTotal2: number = 0;
let numberMatrix: Array<numberLocation> = [];
let starMatrix: Array<string> = [];

for (let x = 0; x < input1.length; x++) {
  const row = input1[x];

  let newNumber = '';
  for (let k = 0; k < row.length; k++) {
    const col = row[k];
    //let numberStart = false;
    if (digitReg.test(col)) {
      newNumber += col + '';
    } else {
      let result = checkNumberIsValidWithStar(newNumber, x, k);
      if (result.isValid && Number(newNumber) > 0) {
        let starLocation = 'x' + result.x + 'y' + result.y;
        if (starMatrix.indexOf(starLocation) < 0) {
          starMatrix.push(starLocation);
        }
        numberMatrix.push({ num: Number(newNumber), loc: starLocation });

        //console.log('number: ' + newNumber + ', x: ' + x + ', k: ' + k);
      }
      newNumber = '';
    }
  }
  if (Number(newNumber)) {
    let result = checkNumberIsValidWithStar(newNumber, x, row.length - 1);
    if (result.isValid && Number(newNumber) > 0) {
      let starLocation = 'x' + result.x + 'y' + result.y;
      if (starMatrix.indexOf(starLocation) < 0) {
        starMatrix.push(starLocation);
      }
      numberMatrix.push({ num: Number(newNumber), loc: starLocation });
    }
  }
}

function checkNumberIsValidWithStar(
  s: string,
  rowIndex: number,
  colIndex: number
): { isValid: boolean; x: number; y: number } {
  // check right
  if (colIndex != input1[rowIndex].length - 1) {
    if (input1[rowIndex][colIndex] == '*') {
      return { isValid: true, x: rowIndex, y: colIndex };
    }
  }

  let colStart = colIndex - s.length - 1;

  // check left
  if (colStart > -1) {
    if (input1[rowIndex][colStart] == '*') {
      return { isValid: true, x: rowIndex, y: colStart };
    }
  }

  let rowLength = s.length + 2;

  // check top row
  if (rowIndex != 0) {
    for (let x = 0; x < rowLength; x++) {
      const element = input1[rowIndex - 1][x + colStart];
      if (element == '*') {
        return { isValid: true, x: rowIndex - 1, y: x + colStart };
      }
    }
  }

  // check bottom row
  if (rowIndex != input1.length - 1) {
    for (let x = 0; x < rowLength; x++) {
      const element = input1[rowIndex + 1][x + colStart];
      if (element == '*') {
        return { isValid: true, x: rowIndex + 1, y: x + colStart };
      }
    }
  }

  return { isValid: false, x: 0, y: 0 };
}

console.log(numberMatrix);

starMatrix.forEach((star) => {
  console.log(star);
  const numbers = numberMatrix.filter((x) => x.loc == star);
  if (numbers.length == 2) {
    maxTotal2 += numbers[0].num * numbers[1].num;
  }
});

console.log('second part :' + maxTotal2);
// 72513
