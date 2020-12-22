import { calculatePercentage } from "./";

describe("test percentage calculation", () => {
  test("5 over 10 is 50%", () => {
    const numerator = 5;
    const denominator = 10;

    const output = 50;

    expect(calculatePercentage(numerator, denominator)).toEqual(output);
  });
  test("5 over 10 is NOT 60%", () => {
    const numerator = 5;
    const denominator = 10;

    const output = 60;

    expect(calculatePercentage(numerator, denominator)).not.toEqual(output);
  });
  test("1.2 over 2.7 rounds to whole integer", () => {
    const numerator = 1.2;
    const denominator = 2.7;

    const output = 44;
    expect(calculatePercentage(numerator, denominator)).toEqual(output);
  });
});
