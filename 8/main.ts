import { FileHelper } from '../filehelper';

const folderPath = '8';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotalStep = 0;

var digitReg = /^\d+$/;

let instructions: Array<string> = [];

class Path {
  constructor(k: string, l: string, r: string) {
    this.key = k;
    this.left = l;
    this.right = r;
  }

  public key: string;
  public left: string;
  public right: string;

  public toString = (): string => {
    return `(K:${this.key}, L:${this.left}, R:${this.right})`;
  };
}

let paths: Array<Path> = [];

for (let index = 0; index < input1.length; index++) {
  const element = input1[index];
  if (index == 0) {
    instructions = Array.from(element);
    continue;
  }
  if (element == '') {
    continue;
  }

  const splitted = element.split('=').filter((i) => i);
  const leftRight = splitted[1]
    .replace('(', '')
    .replace(')', '')
    .split(',')
    .filter((i) => i);

  paths.push(
    new Path(splitted[0].trim(), leftRight[0].trim(), leftRight[1].trim())
  );
  //console.log(splitted);
}

//console.log(paths.toString());

//console.log(games.filter((x) => x.GameStrength == 0).toString());
let loop = true;
let currentPath = paths.find((x) => x.key == 'AAA') || new Path('', '', '');

while (loop) {
  if (currentPath.key == 'ZZZ') {
    loop = false;
  }
  instructions.forEach((el, i) => {
    maxTotalStep++;

    if (el == 'L') {
      let found = paths.find((x) => x.key == currentPath.left);
      if (found) {
        // console.log(
        //   'current: %s,L next: %s ',
        //   currentPath.toString(),
        //   found.toString(),
        //   maxTotalStep
        // );
        currentPath = found;
      }
    } else if (el == 'R') {
      let found = paths.find((x) => x.key == currentPath.right);
      if (found) {
        // console.log(
        //   'current: %s,R next: %s ',
        //   currentPath.toString(),
        //   found.toString(),
        //   maxTotalStep
        // );
        currentPath = found;
      }
    }

    if (currentPath.key == 'ZZZ') {
      loop = false;
    }
  });
}

console.log('first part :' + maxTotalStep);
//16531

// console.log(
//   games.sort((a, b) => 0 - (a.GameRank > b.GameRank ? 1 : -1)).toString()
// );

//part 2

let maxTotalStep2 = 0;
let loop2 = true;
let currentPaths2 = paths.filter((x) => x.key[2] == 'A');
currentPaths2 = [paths.filter((x) => x.key[2] == 'A')[5]];
console.log('current: %s ', currentPaths2.toString());
while (loop2) {
  if (isAllEndsWithZ(currentPaths2)) {
    loop2 = false;
  }
  instructions.forEach((el, i) => {
    maxTotalStep2++;

    let founds: Array<Path> = [];
    if (el == 'L') {
      currentPaths2.forEach((p) => {
        let found = paths.find((x) => x.key == p.left);
        if (found) {
          founds.push(found);
        }
      });
    }
    if (el == 'R') {
      currentPaths2.forEach((p) => {
        let found = paths.find((x) => x.key == p.right);
        if (found) {
          founds.push(found);
        }
      });
    }
    console.log('next: %s ', founds.toString(), el, maxTotalStep2);
    currentPaths2 = founds;

    if (isAllEndsWithZ(currentPaths2)) {
      loop2 = false;
    }
  });
}

function isAllEndsWithZ(paths: Array<Path>): boolean {
  let allFound = false;
  const founds = paths.filter((x) => x.key[2] == 'Z');
  if (founds.length == paths.length) {
    allFound = true;
  }
  return allFound;
}
// console.log(
//   games2.sort((a, b) => 0 - (a.GameRank > b.GameRank ? 1 : -1)).toString()
// );

console.log(
  'second part :' +
    (19241 / instructions.length) *
      (18157 / instructions.length) *
      (19783 / instructions.length) *
      (16531 / instructions.length) *
      (21409 / instructions.length) *
      (14363 / instructions.length) *
      instructions.length
);
console.log(19241 % instructions.length, 19241 / instructions.length);
console.log(18157 % instructions.length, 18157 / instructions.length);
console.log(19783 % instructions.length, 19783 / instructions.length);
console.log(16531 % instructions.length, 16531 / instructions.length);
console.log(21409 % instructions.length, 21409 / instructions.length);
console.log(14363 % instructions.length, 14363 / instructions.length);

// 250825971 --
// (K:MLA, L:VNL, R:GCN) - (K:KPZ, L:GCN, R:VNL) = 19241
// (K:BQA, L:VHX, R:MQS) - (K:BDZ, L:MQS, R:VHX) = 18157
// (K:MJA, L:CMV, R:KRP) - (K:GNZ, L:KRP, R:CMV) = 19783
// (K:AAA, L:TPN, R:SHQ) - (K:ZZZ, L:SHQ, R:TPN) = 16531
// (K:TGA, L:RRG, R:SCV) - (K:RFZ, L:SCV, R:RRG) = 21409
// (K:BJA, L:XCH, R:MJC) - (K:TMZ, L:MJC, R:XCH) = 14363
