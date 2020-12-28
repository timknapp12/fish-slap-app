import { calculatePercentage, shapeImageName, findPath } from "./";

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

describe("shapeImageName", () => {
  test("add _300x300 to image name in url", () => {
    const input =
      "https://firebasestorage.googleapis.com/v0/b/fish-slap-app.appspot.com/o/images%2F.startOfImageName.Tim.Knapp.EfXE0MtTk2R5bP62oaDJsOAKgA42.1608665527648.endOfImageName.?alt=media&token=34381033-cd33-466b-a482-8749256cdc3f";

    const output =
      "https://firebasestorage.googleapis.com/v0/b/fish-slap-app.appspot.com/o/images%2F.startOfImageName.Tim.Knapp.EfXE0MtTk2R5bP62oaDJsOAKgA42.1608665527648.endOfImageName._300x300?alt=media&token=34381033-cd33-466b-a482-8749256cdc3f";

    expect(shapeImageName(input)).toEqual(output);
  });
});

describe("findPath", () => {
  test("find path/image name in url", () => {
    const input =
      "https://firebasestorage.googleapis.com/v0/b/fish-slap-app.appspot.com/o/images%2F.startOfImageName.Tim.Knapp.EfXE0MtTk2R5bP62oaDJsOAKgA42.1608665527648.endOfImageName.?alt=media&token=34381033-cd33-466b-a482-8749256cdc3f";

    const output =
      ".startOfImageName.Tim.Knapp.EfXE0MtTk2R5bP62oaDJsOAKgA42.1608665527648.endOfImageName._300x300";

    expect(findPath(input)).toEqual(output);
  });
});
