import { Ratio } from "src/app/shared/pipes/utils/ratio";
import { Utils } from "src/app/shared/pipes/utils/utils";
import { IQuestion, IRatio } from "../../question";

export class Question3 {
  static generateVariation(no: number): IQuestion {
    /**
     * At first, the number of black beads was a1/a2 of the number of white beads.
     * After b1⁄b2 of the black beads and c1/c2 of the white beads were used, d were left.
     *
     * Total number of units = b2* c2
     *
     * Before:
     * Number of units of black beads = a1*(b2 * c2) / (a1+a2) = a1(a1+a2) * x * y.  (b2 = (a1 + a2) * x, c2 = (a1 + a2) * y)
     * Number of units of white beads = a2*(b2*c2) / (a1+a2) = a2 (a1+a2) *x * y
     *
     * After:
     * Number of units of black beads used = a1 * b1 * c2 / (a1+a2) = a1 * b1 * y
     * Number of units of white beads used = a2 * b2 * c1 / (a1+a2) = a2 * c1 * x
     * Number of units of beads used = (a1 * b1 * y + a2 * c1 * x) / (b2 * c2)
     *
     * Number of units of beads left = (b2 * c2) - (a1 * b1 * y + a2 * c1 * x) = d/numPerUnit
     */

    let simplestBlackWhiteRatio: Ratio;
    do {
      simplestBlackWhiteRatio = Utils.generateRatio(0, true).simplify();
    } while (simplestBlackWhiteRatio.left + simplestBlackWhiteRatio.right > 10);

    const a1 = simplestBlackWhiteRatio.left;
    const a2 = simplestBlackWhiteRatio.right;

    let b1: number;
    let b2: number;

    let c1: number;
    let c2: number;

    const x = Utils.random(1, 2);
    const y = Utils.random(1, 2);

    do {
      b1 = Utils.random(1, 10);
      b2 = (a1 + a2) * x;
    } while (!Utils.isPrime(b1) || b1 > b2 || Utils.greatestCommonDivisor(b1, b2) > 1);

    do {
      c1 = Utils.random(1, 10);
      c2 = (a1 + a2) * y;
    } while (!Utils.isPrime(c1) || c1 > c2 || Utils.greatestCommonDivisor(c1, c2) > 1);

    const simplestUsedBlackRatio = new Ratio(b1, b2).simplify();
    const simplestUsedWhiteRatio = new Ratio(c1, c2).simplify();

    let numberPerUnit: number;
    let remainingBeads: number;

    numberPerUnit = Utils.random(1, 10);
    remainingBeads = ( (b2 * c2) - (a1 * b1 * y + a2 * c1 * x) ) * numberPerUnit;

    // Generate Description
    const description = this.generateDescription(simplestBlackWhiteRatio, simplestUsedBlackRatio, simplestUsedWhiteRatio, remainingBeads);


    // Generate Solution
    const solution = this.generateSolution(simplestBlackWhiteRatio, simplestUsedBlackRatio, simplestUsedWhiteRatio, remainingBeads);

    return {
      no,
      description,
      name: `Variation ${no}`,
      solution,
      options: []
    }
  }

  static generateDescription(
    simplestBlackWhiteRatio: Ratio,
    simplestUsedBlackRatio: Ratio,
    simplestUsedWhiteRatio: Ratio,
    remainingBeads: number
  ): string {
    return `A box contained black beads and white beads. At first, the number of black beads was
      ${simplestBlackWhiteRatio.left}/${simplestBlackWhiteRatio.right} of the number of white beads.
      After ${simplestUsedBlackRatio.left}⁄${simplestUsedBlackRatio.right} of the black beads and ${simplestUsedWhiteRatio.left}⁄${simplestUsedWhiteRatio.right} of the white beads were
    used, ${remainingBeads} were left.<br><br>
    a) What fraction of the beads were used? Leave your answer in the simplest form.<br><br>
    b) How many beads were there in the box at first?`;
  }

  static generateSolution(
    simplestBlackWhiteRatio: Ratio,
    simplestUsedBlackRatio: Ratio,
    simplestUsedWhiteRatio: Ratio,
    remainingBeads: number
  ): string {
    const totalUnits = simplestUsedBlackRatio.right * simplestUsedWhiteRatio.right;

    const blackUnits = totalUnits / (simplestBlackWhiteRatio.left + simplestBlackWhiteRatio.right) * simplestBlackWhiteRatio.left;
    const whiteUnits = totalUnits - blackUnits;

    const lcm = Utils.leastCommonMultiple(simplestUsedBlackRatio.right, simplestUsedWhiteRatio.right);

    const blackRatioCD: IRatio = {
      left: simplestUsedBlackRatio.left * lcm / simplestUsedBlackRatio.right,
      right: lcm
    };
    const whiteRatioCD: IRatio = {
      left: simplestUsedWhiteRatio.left * lcm / simplestUsedWhiteRatio.right,
      right: lcm
    };

    const blackUnitsUsed = blackUnits / blackRatioCD.right * blackRatioCD.left;
    const whiteUnitsUsed = whiteUnits / whiteRatioCD.right * whiteRatioCD.left;

    const totalUnitsUsed = blackUnitsUsed + whiteUnitsUsed;
    const totalUnitsNotUsed = totalUnits - totalUnitsUsed;

    let calculateBlackRatioString = '';
    let calculateWhiteRatioString = '';

    if (simplestUsedBlackRatio.left !== blackRatioCD.left) {
      calculateBlackRatioString = `<br>${simplestUsedBlackRatio.left}/${simplestUsedBlackRatio.right} = ${blackRatioCD.left}/${blackRatioCD.right} of the black beads were used.`;
    }

    if (simplestUsedWhiteRatio.left !== whiteRatioCD.left) {
      calculateWhiteRatioString = `<br>${simplestUsedWhiteRatio.left}/${simplestUsedWhiteRatio.right} = ${whiteRatioCD.left}/${whiteRatioCD.right} of the white beads were used.<br>`;
    }

    const numPerUnit = remainingBeads / totalUnitsNotUsed;

    const simplestRatioUsed = new Ratio(totalUnitsUsed, totalUnits).simplify();

    return `a)<br>
    Total number of units = ${simplestUsedBlackRatio.right} x ${simplestUsedWhiteRatio.right} = ${totalUnits}<br><br>
    Before:<br>
    Number of units of black beads = ${totalUnits} ÷ ${simplestBlackWhiteRatio.left + simplestBlackWhiteRatio.right} ${simplestBlackWhiteRatio.left !== 1 ? 'x ' +simplestBlackWhiteRatio.left : ''} = ${blackUnits}<br>
    Number of units of white beads = ${totalUnits} - ${blackUnits} = ${whiteUnits}<br>
    <br>After:
    ${calculateBlackRatioString ? calculateBlackRatioString: ''}
    ${calculateWhiteRatioString ? calculateWhiteRatioString: ''}
    <br>Number of units of black beads used = ${blackRatioCD.left}/${blackRatioCD.right} x ${blackUnits} = ${blackUnitsUsed}
    <br>Number of units of white beads used = ${whiteRatioCD.left}/${whiteRatioCD.right} x ${whiteUnits} = ${whiteUnitsUsed}
    <br>Number of units of beads used = ${blackUnitsUsed} + ${whiteUnitsUsed} = ${totalUnitsUsed}
    <br>Fraction of the beads that were used = ${totalUnitsUsed}/${totalUnits} ${simplestRatioUsed.left !== totalUnitsUsed ? '= '+simplestRatioUsed.left+'/'+simplestRatioUsed.right : ''}

    <br><br>b)
    <br>Fraction of beads left = 1 – ${totalUnitsUsed}/${totalUnits} = ${totalUnitsNotUsed}/${totalUnits}
    <br>${totalUnitsNotUsed} units = ${remainingBeads} beads
    <br>1 unit = ${remainingBeads} beads ÷ ${totalUnitsNotUsed} = ${numPerUnit} beads
    <br>${totalUnits} units = ${totalUnits} beads x ${numPerUnit} = ${totalUnits * numPerUnit} beads`;
  }

}
