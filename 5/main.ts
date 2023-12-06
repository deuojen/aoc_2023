import { FileHelper } from '../filehelper';

const folderPath = '5';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotal = 0;

var digitReg = /^\d+$/;

let seeds: Array<number> = [];
let seedToSoils: Map<number, number> = new Map<number, number>();

interface SeedMap {
  seed: number;
  next: number;
  modified: boolean;
}

let seedMap: Array<SeedMap> = [];

for (let index = 0; index < input1.length; index++) {
  const row = input1[index];

  if (row.indexOf('seeds:') > -1) {
    const seedSplit = row
      .replace('seeds: ', '')
      .split(' ')
      .filter((i) => i);

    seedSplit.forEach((seed, i) => {
      seedMap.push({ seed: i, next: Number(seed), modified: false });
    });
    continue;
  }
  if (row == '') {
    seedMap.forEach((element) => {
      element.modified = false;
    });
    continue;
  }
  //console.log(row);
  const mapping = row.split(' ').filter((i) => i);
  for (let i = 0; i < seedMap.length; i++) {
    const path = seedMap[i];
    let targetStart = Number(mapping[0]);
    let sourceStart = Number(mapping[1]);
    let range = Number(mapping[2]);
    const isValid = isItInRange(sourceStart, range, path.next);
    if (isValid && !path.modified) {
      let distance = path.next - sourceStart;
      seedMap[i].next = targetStart + distance;
      seedMap[i].modified = true;
    }
  }
}

function isItInRange(start: number, range: number, target: number): boolean {
  if (target >= start && target <= start + range) {
    return true;
  }
  return false;
}

console.log(
  'first part :' +
    seedMap.reduce((min, p) => (p.next < min ? p.next : min), seedMap[0].next)
);
//535088217

//part 2

let seeds2: Array<number> = [];

interface Map2 {
  index: number;
  target: number;
  source: number;
  range: number;
}
let maps2: Array<Map2> = [];
let mapIndex = 0;

interface SeedMap2 {
  min: number;
  max: number;
  modified: boolean;
}

let seedMap2: Array<SeedMap2> = [];

for (let i = 0; i < input1.length; i++) {
  const row = input1[i];

  if (row.indexOf('seeds:') > -1) {
    const seedSplit = row
      .replace('seeds: ', '')
      .split(' ')
      .filter((x) => x);

    seedSplit.forEach((el) => {
      seeds2.push(Number(el));
    });

    for (let index = 0; index < seedSplit.length; index += 2) {
      const current = Number(seedSplit[index]);
      const next = Number(seedSplit[index + 1]);

      seedMap2.push({
        min: current,
        max: current + next,
        modified: false,
      });
    }

    continue;
  }

  //console.log(row);
  if (row == '') {
    continue;
  }

  if (row.indexOf('map:') > -1) {
    mapIndex++;
    continue;
  }

  const mapping = row.split(' ').filter((i) => i);
  let targetStart = Number(mapping[0]);
  let sourceStart = Number(mapping[1]);
  let range = Number(mapping[2]);

  maps2.push({
    index: mapIndex,
    target: targetStart,
    source: sourceStart,
    range: range,
  });

  //console.log(seedMap2);
}

//console.log(seedMap2);
//console.log(maps2);

let seedMapTemp: Array<SeedMap2> = [];

for (let j = 1; j <= mapIndex; j++) {
  seedMap2.forEach((x1) => (x1.modified = false));
  const mapEl = maps2.filter((x) => x.index == j);
  //console.log('check -1: ', mapEl);
  let searcSubs = false;
  let filtered = mapEl.filter((x) => x.index == j);

  for (let i = 0; i < seedMap2.length; i++) {
    const current = seedMap2[i];
    filtered.forEach((el) => {
      scanTheTree(el, current, i);
      if (seedMapTemp.length > 0) {
        //console.log('before1', seedMap2);
        seedMap2.push(...seedMapTemp);
        searcSubs = true;
        seedMapTemp = [];
        //console.log('after1', seedMap2);
      }
    });
  }

  console.log('order: ', j, mapIndex);

  if (j == mapIndex) {
    break;
  }

  while (searcSubs) {
    searcSubs = false;
    for (let k = 0; k < seedMap2.length; k++) {
      const element = seedMap2[k];
      if (element.modified) {
        continue;
      }
      filtered.forEach((el) => {
        scanTheTree(el, element, k);
        if (seedMapTemp.length > 0) {
          console.log('before2', element, j);
          seedMap2.push(...seedMapTemp);
          searcSubs = true;
          seedMapTemp = [];
          console.log('after2', seedMap2);
        }
      });
    }
  }
}

function scanTheTree(el: Map2, current: SeedMap2, index: number) {
  if (current.modified) {
    return;
  }
  const isMinValid = isItInRange(el.source, el.range, current.min);
  const isMaxValid = isItInRange(el.source, el.range, current.max);

  //console.log('check: ', current, el, isMinValid, isMaxValid);
  if (isMinValid && isMaxValid && !current.modified) {
    //console.log('check 11: ', current, el);
    let gap = el.target - el.source;
    seedMap2[index].min = current.min + gap;
    seedMap2[index].max = current.max + gap;
    seedMap2[index].modified = true;

    //console.log('check 12: ', current, el);
  } else if (isMinValid && !current.modified) {
    //console.log('check 21: ', current, el);
    // { min: 57, max: 70, modified: false } { index: 3, target: 49, source: 53, range: 8 } 53 + 8 = 61 = 53 -> 61 (57-61)
    // new { min: 62, max: 70, modified: false } - (57-61) 57 - 53 = 4
    let tempMin = el.source + el.range + 1;
    let tempMax = current.max;

    seedMapTemp.push({
      min: tempMin,
      max: tempMax,
      modified: false,
    });
    //console.log(seedMapTemp);
    let gapMin = current.min - el.source; // 4
    seedMap2[index].min = el.target + gapMin;
    seedMap2[index].max = el.target + el.range;

    seedMap2[index].modified = true;
    // { min: 53, max: 66, modified: true } { index: 3, target: 49, source: 53, range: 8 }
    //console.log('check 22: ', current, el);
  } else if (isMaxValid && !current.modified) {
    //console.log('check 31: ', current, el);
    // { min: 74, max: 88, modified: false } { index: 5, target: 45, source: 77, range: 23 } 77 + 23 = 100 -> 77 - 100 ( 77 - 88)
    // new { min: 74, max: 76, modified: false } - ( 77 - 88) 88 - 77 = 11
    let tempMin = current.min;
    let tempMax = el.source - 1;

    seedMapTemp.push({
      min: tempMin,
      max: tempMax,
      modified: false,
    });
    //console.log(seedMapTemp);
    let gapMax = current.max - el.source; // 11
    seedMap2[index].min = el.target; // 45
    seedMap2[index].max = el.target + gapMax; // 45 + 11 = 56

    seedMap2[index].modified = true;
    //  { min: 45, max: 56, modified: true } { index: 5, target: 45, source: 77, range: 23 }
    //console.log('check 32: ', current, el);
  }
}

//console.log(seedMap2);

console.log(
  'second part :' +
    seedMap2.reduce((min, p) => (p.min < min ? p.min : min), seedMap2[0].min)
);
// 51399228 --
