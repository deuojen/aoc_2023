import { FileHelper } from '../filehelper';

const folderPath = '1';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);
//console.log(input1);

let currentTotal = 0;
let maxTotal = 0;

for (let index = 0; index < input1.length; index++) {
  const line = input1[index];

  let firstNumber = '';
  let lastNumber = '';
  for (let x = 0; x < line.length; x++) {
    const element = line[x];
    if (Number(element)) {
      if (firstNumber == '') {
        firstNumber = element;
      }
      lastNumber = element;
    }
  }

  let currentLineNumber = firstNumber + '' + lastNumber;
  maxTotal += Number(currentLineNumber);
}

//console.log(currentTotal);
console.log('first part :' + maxTotal);
//54634

let maxTotal2 = 0;
const numbers = [
  [/oneight/g, '1'],
  [/twone/g, '2'],
  [/threeight/g, '3'],
  [/fiveight/g, '5'],
  [/sevenine/g, '7'],
  [/eightwo/g, '8'],
  [/eighthree/g, '8'],
  [/nineight/g, '9'],
  [/one/g, '1'],
  [/two/g, '2'],
  [/three/g, '3'],
  [/four/g, '4'],
  [/five/g, '5'],
  [/six/g, '6'],
  [/seven/g, '7'],
  [/eight/g, '8'],
  [/nine/g, '9'],
];

const number2 = [
  ['oneight', '8'],
  ['twone', '1'],
  ['threeight', '8'],
  ['fiveight', '8'],
  ['sevenine', '9'],
  ['eightwo', '2'],
  ['eighthree', '3'],
  ['nineight', '8'],
];

for (let index = 0; index < input1.length; index++) {
  let line = input1[index];
  //console.log(line);
  let print = false;
  for (let x = 0; x < number2.length; x++) {
    const lastIndex = line.lastIndexOf(number2[x][0]);
    const newText = line.substring(lastIndex);
    if (!hasNumber(newText)) {
      console.log(
        line.substring(0, lastIndex) + number2[x][1] + ' - old - ' + line
      );
      line = line.substring(0, lastIndex) + number2[x][1];
      print = !print;
    }
  }

  numbers.forEach((regex) => {
    line = line.replace(regex[0], regex[1] + '');
  });

  let firstNumber = '';
  let lastNumber = '';
  for (let x = 0; x < line.length; x++) {
    const element = line[x];
    if (Number(element)) {
      if (firstNumber == '') {
        firstNumber = element;
      }
      lastNumber = element;
    }
  }

  let currentLineNumber = firstNumber + '' + lastNumber;
  maxTotal2 += Number(currentLineNumber);

  if (print) {
    console.log(currentLineNumber);
    console.log('');
  }
}

function hasNumber(myString: string) {
  return /\d/.test(myString);
}

console.log('second part :' + maxTotal2);
// 53429
// 53504
