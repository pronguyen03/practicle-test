import { IRatio } from "src/app/components/question";
import { Utils } from "./utils";

export class Ratio implements IRatio {
  left: number;
  right: number;

  constructor(left: number, right: number) {
    this.left = left;
    this.right = right;
  }

  divideBy(ratio: IRatio): Ratio {
    const result = {
      left: this.left * ratio.right,
      right: this.right * ratio.left
    }

    const gcd = Utils.greatestCommonDivisor(result.left, result.right);

    return new Ratio(result.left / gcd, result.right / gcd);
  }

  multiple(ratio: IRatio) {

  }

  subtract(ratio: IRatio): Ratio {
    const lcm = Utils.leastCommonMultiple(this.right, ratio.right);

    const result = {
      left: this.left * (lcm / this.right) - ratio.left * (lcm / ratio.right),
      right: lcm
    }

    const gcd = Utils.greatestCommonDivisor(result.left, result.right);

    return new Ratio(result.left / gcd, result.right / gcd);
  }

  simplify(): Ratio {
    const gcd = Utils.greatestCommonDivisor(this.left, this.right);

    return new Ratio(this.left / gcd, this.right / gcd);
  }
}
