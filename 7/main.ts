import { FileHelper } from '../filehelper';

const folderPath = '7';

const input1 = FileHelper.ReadFile(`./${folderPath}/input1.txt`);

let maxTotal = 0;

var digitReg = /^\d+$/;

let gameRules = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

class Game {
  constructor(
    game: string,
    gameRankStr: number,
    score: number,
    s: Strength,
    ruleScore: Array<number>
  ) {
    this.GameStr = game;
    this.GameRankStr = gameRankStr;
    this.Score = score;
    this.GameStrength = s;
    this.GameRank = 0;
    this.RuleScore = ruleScore;
  }

  public GameStr: string;
  public GameRankStr: number;
  public Score: number;
  public GameStrength: Strength;
  public GameRank: number;
  public RuleScore: Array<number>;

  public toString = (): string => {
    return `GameStr (${this.GameStr}), GameRankStr (${
      this.GameRankStr
    }), Score (${this.Score}), Strength (${
      Strength[this.GameStrength]
    }), GameRank (${
      this.GameRank
    }), RuleScore (${this.RuleScore.toString()})\n`;
  };
}

enum Strength {
  None = 0,
  HighCard = 1,
  OnePair = 2,
  TwoPair = 3,
  ThreeOfAKind = 4,
  FullHouse = 5,
  FourOfAKind = 6,
  FiveOfAKind = 7,
}

let games: Array<Game> = [];

for (let index = 0; index < input1.length; index++) {
  const element = input1[index];
  const splitted = element.split(' ').filter((i) => i);

  const gameStr = splitted[0];
  const score = Number(splitted[1]);

  const ruleScore = GetRuleScore(gameRules, gameStr);
  const strength = GetStrength(gameRules, gameStr, ruleScore);

  const gameRankStr = GetGameRankStr(gameRules, gameStr);

  //console.log('game: %s', gameStr, ruleScore.toString(), Strength[strength]);
  games.push(
    new Game(gameStr, Number(gameRankStr), score, strength, ruleScore)
  );
}

function GetRuleScore(rules: Array<string>, str: string): Array<number> {
  let result: Array<number> = [];
  rules.forEach((el, i) => {
    let matchCount = 0;
    for (let j = 0; j < str.length; j++) {
      const char = str[j];
      if (char == el) {
        matchCount++;
      }
    }
    result.push(matchCount);
  });

  const currentJ = result[0];
  if (rules[0] == 'J' && currentJ > 0) {
    result[0] = 0;
    if (currentJ == 5) {
      result[result.length - 1] = 5;
    } else {
      let biggestIndex = 0;
      let biggestNumber = 0;
      for (let index = result.length - 1; index >= 0; index--) {
        if (result[index] > biggestNumber) {
          biggestNumber = result[index];
          biggestIndex = index;
        }
      }
      result[biggestIndex] = biggestNumber + currentJ;
      //console.log('parse check: ', str, result.toString());
    }
  }

  return result;
}

function GetStrength(
  rules: Array<string>,
  str: string,
  ruleScore: Array<Number>
): Strength {
  if (ruleScore.indexOf(5) > -1) {
    return Strength.FiveOfAKind;
  } else if (ruleScore.indexOf(4) > -1) {
    return Strength.FourOfAKind;
  } else if (ruleScore.indexOf(3) > -1 && ruleScore.indexOf(2) > -1) {
    return Strength.FullHouse;
  } else if (ruleScore.indexOf(3) > -1) {
    return Strength.ThreeOfAKind;
  } else if (ruleScore.filter((x) => x == 2).length == 2) {
    return Strength.TwoPair;
  } else if (ruleScore.indexOf(2) > -1) {
    return Strength.OnePair;
  }

  let inOrder = false;
  let firstNumber = rules.indexOf(str[0]);
  if (
    str[1] == rules[firstNumber + 1] &&
    str[2] == rules[firstNumber + 2] &&
    str[3] == rules[firstNumber + 3] &&
    str[4] == rules[firstNumber + 4]
  ) {
    console.log(
      'chars',
      str,
      rules[firstNumber + 1],
      rules[firstNumber + 2],
      rules[firstNumber + 3],
      rules[firstNumber + 4]
    );
    inOrder = true;
  }

  return inOrder ? Strength.HighCard : Strength.None;
}

function GetGameRankStr(rules: Array<string>, str: string): string {
  let returnStr = '';
  for (let index = 0; index < str.length; index++) {
    const strength = rules.indexOf(str[index]) + 1;
    if (strength < 10) {
      returnStr += '0' + strength;
    } else {
      returnStr += '' + strength;
    }
  }
  return returnStr;
}

//console.log(games.toString());

//console.log(games.filter((x) => x.GameStrength == 0).toString());

let rank = 1;
for (let index = 0; index <= 8; index++) {
  let filterdGames = games.filter(
    (x) => x.GameStrength == index && x.GameRank == 0
  );
  if (filterdGames.length > 1) {
    let loop = true;
    while (loop) {
      filterdGames = games.filter(
        (x) => x.GameStrength == index && x.GameRank == 0
      );
      if (filterdGames.length == 0) {
        loop = false;
        break;
      }
      const lowest = filterdGames.reduce((prev, curr) =>
        prev.GameRankStr < curr.GameRankStr ? prev : curr
      );
      games[games.findIndex((x) => x.GameStr == lowest.GameStr)].GameRank =
        rank;
      rank++;
    }
  } else if (filterdGames.length == 1) {
    games[
      games.findIndex((x) => x.GameStr == filterdGames[0].GameStr)
    ].GameRank = rank;
    rank++;
  }
}

console.log(
  'first part :' +
    games.reduce(
      (accumulator, current) => accumulator + current.GameRank * current.Score,
      0
    )
);
//251216224

// console.log(
//   games.sort((a, b) => 0 - (a.GameRank > b.GameRank ? 1 : -1)).toString()
// );

//part 2

let gameRules2 = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
];

let games2: Array<Game> = [];

for (let index = 0; index < input1.length; index++) {
  const element = input1[index];
  const splitted = element.split(' ').filter((i) => i);

  const gameStr = splitted[0];
  const score = Number(splitted[1]);

  const ruleScore = GetRuleScore(gameRules2, gameStr);
  const strength = GetStrength(gameRules2, gameStr, ruleScore);

  const gameRankStr = GetGameRankStr(gameRules2, gameStr);

  //console.log('game: %s', gameStr, ruleScore.toString(), Strength[strength]);
  games2.push(
    new Game(gameStr, Number(gameRankStr), score, strength, ruleScore)
  );
}

let rank2 = 1;
for (let index = 0; index <= 8; index++) {
  let filterdGames = games2.filter(
    (x) => x.GameStrength == index && x.GameRank == 0
  );
  if (filterdGames.length > 1) {
    let loop = true;
    while (loop) {
      filterdGames = games2.filter(
        (x) => x.GameStrength == index && x.GameRank == 0
      );
      if (filterdGames.length == 0) {
        loop = false;
        break;
      }
      const lowest = filterdGames.reduce((prev, curr) =>
        prev.GameRankStr < curr.GameRankStr ? prev : curr
      );
      games2[games2.findIndex((x) => x.GameStr == lowest.GameStr)].GameRank =
        rank2;
      rank2++;
    }
  } else if (filterdGames.length == 1) {
    games2[
      games2.findIndex((x) => x.GameStr == filterdGames[0].GameStr)
    ].GameRank = rank2;
    rank2++;
  }
}

console.log(
  games2.sort((a, b) => 0 - (a.GameRank > b.GameRank ? 1 : -1)).toString()
);

// console.log(
//   'second part :' +
//     games2.reduce(
//       (accumulator, current) => accumulator + current.GameRank * current.Score,
//       0
//     )
// );
// 250825971 --
