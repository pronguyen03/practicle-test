import { IRatio } from "src/app/components/question";
import { Ratio } from "./ratio";

export class Utils {
  static greatestCommonDivisor(a: number, b: number): number {
    if (a === 0 || b === 0) {
      return a + b;
    }

    while (a !== b) {
      if (a > b) {
        a -= b;
      } else {
        b -= a;
      }
    }

    return a;
  }

  static leastCommonMultiple(x: number, y: number) {
   return (!x || !y) ? 0 : Math.abs((x * y) / this.greatestCommonDivisor(x, y));
  }

  static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRatio(total: number = 0, isRightSideGreater: boolean = false): Ratio {
    let left: number;
    let right: number;

    if (total) {
      left = Utils.random(1, total - 1);
      right = total - left;
    } else {
      left = Utils.random(1, 10);
      right = Utils.random(1, 10);;
    }

    if (isRightSideGreater) {
      if (left > right) {
        return new Ratio(right, left);
      } else if (left === right) {
        return this.generateRatio(total, isRightSideGreater);
      } else {
        return new Ratio(left, right);
      }
    }

    return new Ratio(left, right);
  }

  static isPrime(num: number): boolean {
    for (let index = 2, s = Math.sqrt(num); index < s; index++) {
      if (num % index === 0) {
        return false;
      }
    }

    return num > 1;
  }
}
