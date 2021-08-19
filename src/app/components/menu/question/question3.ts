import { Utils } from "src/app/shared/pipes/utils/utils";
import { IQuestion, IRatio } from "../../question";

export class Question3 {
  static generateVariation(no: number): IQuestion {
    let simplestBlackRatio: IRatio;
    let simplestWhiteRatio: IRatio;

    let totalUnits: number;
    let lcm: number;

    do {
      // Black bead
      const blackRatio: IRatio = Utils.generateRatio(0, true);
      const blackGCD = Utils.greatestCommonDivisor(blackRatio.left, blackRatio.right);
      simplestBlackRatio = {
        left: blackRatio.left / blackGCD,
        right: blackRatio.right / blackGCD
      }

      // White bead
      const whiteRatio: IRatio = Utils.generateRatio(0, true);
      const whiteGCD = Utils.greatestCommonDivisor(whiteRatio.left, whiteRatio.right);
      simplestWhiteRatio = {
        left: whiteRatio.left / whiteGCD,
        right: whiteRatio.right / whiteGCD
      }

      /** The total units */
      totalUnits = simplestBlackRatio.right * simplestWhiteRatio.right;
      lcm = Utils.leastCommonMultiple(simplestBlackRatio.right, simplestWhiteRatio.right);
    } while (totalUnits === lcm); // Prevent from divide by totalUnits


    // The Ratio with common denominator
    const blackRatioCD: IRatio = {
      left: simplestBlackRatio.left * lcm / simplestBlackRatio.right,
      right: lcm
    };

    const whiteRatioCD: IRatio = {
      left: simplestWhiteRatio.left * lcm / simplestWhiteRatio.right,
      right: lcm
    };


    // Black to White
    let simplestBlackWhiteRatio: IRatio;
    let blackWhiteRatio: IRatio;

    // do {
      blackWhiteRatio = Utils.generateRatio(totalUnits, true);

      const blackWhiteGCD = Utils.greatestCommonDivisor(blackWhiteRatio.left, blackWhiteRatio.right);
      simplestBlackWhiteRatio = {
        left: blackWhiteRatio.left / blackWhiteGCD,
        right: blackWhiteRatio.right / blackWhiteGCD
      }
    // } while (
    //   !this.isMultipleOf(blackWhiteRatio.left * blackRatioCD.left, lcm) &&
    //   !this.isMultipleOf(blackWhiteRatio.right * whiteRatioCD.left, lcm)
    // );

    const blackUnits = totalUnits / (simplestBlackWhiteRatio.left + simplestBlackWhiteRatio.right) * simplestBlackWhiteRatio.left;
    const whiteUnits = totalUnits - blackUnits;

    const blackUnitsUsed = blackUnits / blackRatioCD.right * blackRatioCD.left;
    const whiteUnitsUsed = whiteUnits / whiteRatioCD.right * whiteRatioCD.left;

    const totalUnitsUsed = blackUnitsUsed + whiteUnitsUsed;
    const totalUnitsNotUsed = totalUnits - totalUnitsUsed;

    const numPerUnit = Utils.random(1, 10);
    const remainingBeads = numPerUnit * totalUnitsNotUsed;

    // Generate Description
    const description = this.generateDescription(simplestBlackWhiteRatio, simplestBlackRatio, simplestWhiteRatio, remainingBeads);


    // Generate Solution
    const solution = this.generateSolution(simplestBlackWhiteRatio, simplestBlackRatio, simplestWhiteRatio, remainingBeads);

    return {
      no,
      description,
      name: `Variation ${no}`,
      solution,
      options: []
    }
  }

  static generateDescription(
    simplestBlackWhiteRatio: IRatio,
    simplestBlackRatio: IRatio,
    simplestWhiteRatio: IRatio,
    remainingBeads: number
  ): string {
    return `A box contained black beads and white beads. At first, the number of black beads was
      ${simplestBlackWhiteRatio.left}/${simplestBlackWhiteRatio.right} of the number of white beads.
      After ${simplestBlackRatio.left}⁄${simplestBlackRatio.right} of the black beads and ${simplestWhiteRatio.left}⁄${simplestWhiteRatio.right} of the white beads were
    used, ${remainingBeads} were left.<br><br>
    a) What fraction of the beads were used? Leave your answer in the simplest form.<br><br>
    b) How many beads were there in the box at first?`;
  }

  static generateSolution(
    simplestBlackWhiteRatio: IRatio,
    simplestBlackRatio: IRatio,
    simplestWhiteRatio: IRatio,
    remainingBeads: number
  ): string {
    const totalUnits = simplestBlackRatio.right * simplestWhiteRatio.right;

    const blackUnits = totalUnits / (simplestBlackWhiteRatio.left + simplestBlackWhiteRatio.right) * simplestBlackWhiteRatio.left;
    const whiteUnits = totalUnits - blackUnits;

    const lcm = Utils.leastCommonMultiple(simplestBlackRatio.right, simplestWhiteRatio.right);

    const blackRatioCD: IRatio = {
      left: simplestBlackRatio.left * lcm / simplestBlackRatio.right,
      right: lcm
    };
    const whiteRatioCD: IRatio = {
      left: simplestWhiteRatio.left * lcm / simplestWhiteRatio.right,
      right: lcm
    };

    const blackUnitsUsed = blackUnits / blackRatioCD.right * blackRatioCD.left;
    const whiteUnitsUsed = whiteUnits / whiteRatioCD.right * whiteRatioCD.left;

    const totalUnitsUsed = blackUnitsUsed + whiteUnitsUsed;
    const totalUnitsNotUsed = totalUnits - totalUnitsUsed;

    let calculateBlackRatioString = '';
    let calculateWhiteRatioString = '';

    if (simplestBlackRatio.left !== blackRatioCD.left) {
      calculateBlackRatioString = `<br>${simplestBlackRatio.left}/${simplestBlackRatio.right} = ${blackRatioCD.left}/${blackRatioCD.right} of the black beads were used.`;
    }

    if (simplestWhiteRatio.left !== whiteRatioCD.left) {
      calculateWhiteRatioString = `<br>${simplestWhiteRatio.left}/${simplestWhiteRatio.right} = ${whiteRatioCD.left}/${whiteRatioCD.right} of the white beads were used.<br>`;
    }

    const numPerUnit = remainingBeads / totalUnitsNotUsed;

    const gcdUsed = 1;
    // const gcdUsed = Utils.greatestCommonDivisor(totalUnitsUsed, totalUnits);
    const simplestRatioUsed = {
      left: totalUnitsUsed/gcdUsed,
      right: totalUnits/gcdUsed
    }

    return `a)<br>
    Total number of units = ${simplestBlackRatio.right} x ${simplestWhiteRatio.right} = ${totalUnits}<br><br>
    Before:<br>
    Number of units of black beads = ${totalUnits} ÷ ${simplestBlackWhiteRatio.left + simplestBlackWhiteRatio.right} ${simplestBlackWhiteRatio.left !== 1 ? 'x ' +simplestBlackWhiteRatio.left : ''} = ${blackUnits}<br>
    Number of units of white beads = ${totalUnits} - ${blackUnits} = ${whiteUnits}<br>
    <br>After:
    ${calculateBlackRatioString ? calculateBlackRatioString: ''}
    ${calculateWhiteRatioString ? calculateWhiteRatioString: ''}
    <br>Number of units of black beads used = ${blackRatioCD.left}/${blackRatioCD.right} x ${blackUnits} = ${blackUnitsUsed}
    <br>Number of units of white beads used = ${whiteRatioCD.left}/${whiteRatioCD.right} x ${whiteUnits} = ${whiteUnitsUsed}
    <br>Number of units of beads used = ${blackUnitsUsed} + ${whiteUnitsUsed} = ${totalUnitsUsed}
    <br>Fraction of the beads that were used = ${totalUnitsUsed}/${totalUnits} ${gcdUsed !== 1 ? '= '+simplestRatioUsed.left+'/'+simplestRatioUsed.right : ''}

    <br><br>b)
    <br>Fraction of beads left = 1 – ${totalUnitsUsed}/${totalUnits} = ${totalUnitsNotUsed}/${totalUnits}
    <br>${totalUnitsNotUsed} units = ${remainingBeads} beads
    <br>1 unit = ${remainingBeads} beads ÷ ${totalUnitsNotUsed} = ${numPerUnit} beads
    <br>32 units = ${totalUnits} beads x ${numPerUnit} = ${totalUnits * numPerUnit} beads`;
  }

  static isMultipleOf(num: number, divisor: number): boolean {
    return num % divisor === 0;
  }
}
