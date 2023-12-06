import { FileHelper } from '../filehelper';

const folderPath = '6';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotal = 0;

var digitReg = /^\d+$/;

class Race {
  constructor(t: number, d: number) {
    this.time = t;
    this.distance = d;
  }

  public time: number;
  public distance: number;

  public toString = (): string => {
    return `Time (${this.time}), Distance (${this.distance})`;
  };
}

let races: Array<Race> = [];

for (let index = 0; index < input1.length; index++) {
  const element = input1[index];

  if (element.indexOf('Time:') > -1) {
    const splitted = element
      .replace('Time:', '')
      .split(' ')
      .filter((i) => i);

    splitted.forEach((el) => {
      races.push(new Race(Number(el), 0));
    });
  }

  if (element.indexOf('Distance:') > -1) {
    const splitted = element
      .replace('Distance:', '')
      .split(' ')
      .filter((i) => i);

    splitted.forEach((el, i) => {
      races[i].distance = Number(el);
    });
  }
}

console.log('array :' + races);
let possibleRuns: Array<number> = [];

races.forEach((race) => {
  let raceTime = race.time;
  let target = race.distance;
  let possibleRunCount = 0;
  // i hold time
  for (let i = 1; i <= raceTime; i++) {
    let speed = i;
    let leftTime = raceTime - i;
    let runTime = speed * leftTime;
    if (runTime > target) {
      possibleRunCount++;
    }
  }
  if (possibleRunCount > 0) {
    possibleRuns.push(possibleRunCount);
  }
});

console.log(
  'first part :' +
    possibleRuns.reduce((accumulator, current) => accumulator * current, 1)
);
//535088217

//part 2

let possibleRuns2: Array<number> = [];

let time: number = 0;
let distance: number = 0;

for (let index = 0; index < input1.length; index++) {
  const element = input1[index];

  if (element.indexOf('Time:') > -1) {
    const timeStr = element.replace('Time:', '').replace(/\s/g, '');
    time = Number(timeStr);
  }

  if (element.indexOf('Distance:') > -1) {
    const distanceStr = element.replace('Distance:', '').replace(/\s/g, '');
    distance = Number(distanceStr);
  }

  //console.log('run 2: ', time, distance);

  if (time > 0 && distance > 0) {
    let possibleRunCount = 0;
    // i hold time
    for (let i = 1; i <= time; i++) {
      let speed = i;
      let leftTime = time - i;
      let runTime = speed * leftTime;
      if (runTime > distance) {
        possibleRunCount++;
      }
    }
    if (possibleRunCount > 0) {
      possibleRuns2.push(possibleRunCount);
    }
  }
}

//console.log(seedMap2);

console.log(
  'second part :' +
    possibleRuns2.reduce((accumulator, current) => accumulator * current, 1)
);
// 51399228 --
