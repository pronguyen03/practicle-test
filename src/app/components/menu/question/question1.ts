import { Utils } from "src/app/shared/pipes/utils/utils";
import { IQuestion } from "../../question";

export interface IGroupVariable {
  total: number,
  ratio: {
    boy: number,
    girl: number
  },
  gcd: number,
  simplestRatio: {
    boy: number,
    girl: number
  }
}

export class Question1 {
  constructor() {}

  static generateVariation(no: number): IQuestion {
    // Generate multiples of Group B to Group A, from 2 to 10
    const multiples = Utils.random(2, 10);


    // Generate numbers of pupils in group A and B
    const numOfGroupA = Utils.random(10, Math.floor(100/(multiples + 1)));
    const total = numOfGroupA * (multiples + 1);
    const numOfGroupB = total - numOfGroupA;

    const ratioA = this.generateRatio(numOfGroupA);
    const ratioB = this.generateRatio(numOfGroupB);

    const gcdA = Utils.greatestCommonDivisor(ratioA.boy, ratioA.girl)
    const gcdB = Utils.greatestCommonDivisor(ratioB.boy, ratioB.girl);

    const groupA: IGroupVariable = {
      total: numOfGroupA,
      ratio: ratioA,
      gcd: gcdA,
      simplestRatio: {
        boy: ratioA.boy/gcdA,
        girl: ratioA.girl/gcdA
      }
    }

    const groupB: IGroupVariable = {
      total: numOfGroupB,
      ratio: ratioB,
      gcd: gcdB,
      simplestRatio: {
        boy: ratioB.boy/gcdB,
        girl: ratioB.girl/gcdB
      }
    }

    // Generate Description
    const description = this.generateDescription(groupA, groupB, multiples);

    // Generate Options
    const options = [
      { optionValue: groupA.ratio.girl + groupB.ratio.girl, isCorrect: false },
      { optionValue: groupA.ratio.boy + groupB.ratio.boy, isCorrect: true },
      { optionValue: Utils.random(groupA.total, total), isCorrect: false },
      { optionValue: Utils.random(groupB.total, total), isCorrect: false },
    ]

    // Generate Solution
    const solution = this.generateSolution(groupA, groupB, multiples);


    return {
      no,
      description,
      name: `Variation ${no}`,
      solution,
      options: this.shuffle(options)
    }
  }

  static generateRatio(total: number) {
    const boy = Utils.random(1, total - 1);
    const girl = total - boy;

    return {
      boy,
      girl
    }
  }

  static generateDescription(groupA: IGroupVariable, groupB: IGroupVariable, multiples: number): string {
    return `The pupils at a camp are divided into Group A and Group B. The ratio of the number of boys
    to the girls in Group A is ${groupA.simplestRatio.boy} : ${groupA.simplestRatio.girl}.
    The ratio of the number of boys to girls in Group B is ${groupB.simplestRatio.boy} : ${groupB.simplestRatio.girl}.
    There are ${multiples} times as many pupils in Group B as in Group A. Which of the following options could be the total
    number of boys in both groups?`;
  }

  static generateSolution(groupA: IGroupVariable, groupB: IGroupVariable, multiples: number): string {
    const simplestRatioAString = `${groupA.simplestRatio.boy} : ${groupA.simplestRatio.girl}`;
    const ratioAString = `${groupA.ratio.boy} : ${groupA.ratio.girl}`;

    const simplestRatioBString = `${groupB.ratio.boy/groupB.gcd} : ${groupB.ratio.girl/groupB.gcd}`;
    const ratioBString = `${groupB.ratio.boy} : ${groupB.ratio.girl}`;

    return `Using equivalent ratios, let’s make the number of pupils in Group B to be ${multiples} times that of Group A.<br/><br/>

    <u>Group A</u><br/>
    Boys : Girls<br/>
    ${groupA.gcd !== 1 ? '= ' + simplestRatioAString + '<br/>' : ''}
    = ${ratioAString}<br/>
    Total number of units = ${groupA.ratio.boy} + ${groupA.ratio.girl} = ${groupA.total}<br/><br/>

    <u>Group B</u><br/>
    Boys : Girls<br/>
    ${groupB.gcd !== 1 ? '= ' + simplestRatioBString + '<br/>' : ''}
    = ${ratioBString}<br/>

    Total number of units = ${groupB.ratio.boy} + ${groupB.ratio.girl} = ${groupB.total}<br/>
    ${groupB.total} / ${groupA.total} = ${multiples}<br/>
    Total number of boys in both groups = ${groupA.ratio.boy} + ${groupB.ratio.boy} = ${groupA.ratio.boy + groupB.ratio.boy}<br/>`
  }

  static shuffle(array: any[]) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
