import { Utils } from "src/app/shared/pipes/utils/utils";
import { IQuestion, IRatio } from "../../question";

export interface variable{

}
export class Question2 {
  constructor() {}

  static generateVariation(no: number): IQuestion {
    /** Generate the % of the blue beads used (which can be divided by 5). E.g 5, 10, 15 */
    const percentage = Utils.random(1, 19) * 5;

    const gcdPercentage = Utils.greatestCommonDivisor(percentage, 100);

    const simplestRatioPercentage: IRatio = {
      left: percentage/gcdPercentage,
      right: 100/gcdPercentage
    }

    /** The blue units not be used yet. */
    const blueUnitsNotUsed = simplestRatioPercentage.right - simplestRatioPercentage.left;

    /** The red units not be used yet (which is less than *blueUnitsNotUsed) */
    const redUnits = Utils.random(1, blueUnitsNotUsed);

    /** The ratio of the number of red beads to blue beads.
     * I didn't change blueUnitsNotUsed to another number. That make the question more complicated */
    const redBlueRatio: IRatio = {
      left: redUnits,
      right: blueUnitsNotUsed
    };

    /** The total units */
    const totalUnits = simplestRatioPercentage.left + redBlueRatio.right + redBlueRatio.left;

    // Generate the number after used red beads (should be less than 1000.).
    let totalAfterUsedRed: number;
    do {
      const numPerUnit = Utils.random(1, 9) * 10;
      totalAfterUsedRed = totalUnits * numPerUnit;
    } while (totalAfterUsedRed > 1000);

    /** The red beads Used */
    const redBeadsUsed = Utils.random(20, 100);
    /** The original beads */
    const originalBeads = totalAfterUsedRed + redBeadsUsed;

    // Generate Description
    const description = this.generateDescription(originalBeads, redBeadsUsed, percentage, redBlueRatio);


    // Generate Solution
    const solution = this.generateSolution(originalBeads, redBeadsUsed, percentage, redBlueRatio, simplestRatioPercentage);

    return {
      no,
      description,
      name: `Variation ${no}`,
      solution,
      options: []
    }
  }

  static generateDescription(originalBeads: number, redBeadsUsed: number, percentage: number, redBlueRatio: IRatio): string {
    const gcd = Utils.greatestCommonDivisor(redBlueRatio.left, redBlueRatio.right);
    const simplestRatio: IRatio = {
      left: redBlueRatio.left/gcd,
      right: redBlueRatio.right/gcd
    }
    return `Ann had a total of ${originalBeads} red and blue beads. She used ${redBeadsUsed} red beads and ${percentage}% of the blue
    beads. After that, the ratio of the number of red beads to blue beads Ann had was ${simplestRatio.left} : ${simplestRatio.right}. <br/>
    a) What fraction of her blue beads did Ann use? Give your answer in the simplest form.<br/>
    b) How many beads did Ann have in the end?`;
  }

  static generateSolution(
    originalBeads: number,
    redBeadsUsed: number,
    percentage: number,
    redBlueRatio: IRatio,
    simplestRatioPercentage: IRatio,
  ): string {
    const remainingBlueRatio: IRatio = {
      left: simplestRatioPercentage.right - simplestRatioPercentage.left,
      right: simplestRatioPercentage.right
    };

    const totalUnits = simplestRatioPercentage.left + redBlueRatio.right + redBlueRatio.left;
    const totalAfterUsedRed = originalBeads - redBeadsUsed;
    const numPerUnit = totalAfterUsedRed / totalUnits;

    const gcd = Utils.greatestCommonDivisor(redBlueRatio.left, redBlueRatio.right);
    const simplestRatio: IRatio = {
      left: redBlueRatio.left/gcd,
      right: redBlueRatio.right/gcd
    }
    const ratioString =
      simplestRatio.left !== redBlueRatio.left
        ? `The ratio of the number of red beads to blue beads after used = ${simplestRatio.left} : ${simplestRatio.right} = ${redBlueRatio.left} : ${redBlueRatio.right}`
        : '';

    return `a)<br/>
    Fraction of blue beads used = ${percentage}/100 = ${simplestRatioPercentage.left}/${simplestRatioPercentage.right}<br/><br/>

    b)<br/>
    Fraction of blue beads left = 1 - ${simplestRatioPercentage.left}/${simplestRatioPercentage.right} = ${remainingBlueRatio.left}/${remainingBlueRatio.right}<br/><br/>

    ${ratioString ? ratioString + '<br>' : ''}
    Total number of units in the end = ${redBlueRatio.left} + ${redBlueRatio.right} = ${redBlueRatio.left + redBlueRatio.right}<br/><br/>

    ${totalUnits} units = ${originalBeads} – ${redBeadsUsed} = ${totalAfterUsedRed}<br/>
    1 unit = ${totalAfterUsedRed} ÷ ${totalUnits} = ${numPerUnit}<br/>
    ${redBlueRatio.left + redBlueRatio.right} units = ${numPerUnit} x ${redBlueRatio.left + redBlueRatio.right} = ${numPerUnit * (redBlueRatio.left + redBlueRatio.right)}`
  }

}
