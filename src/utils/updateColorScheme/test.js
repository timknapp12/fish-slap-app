import { lightTheme, midnightTheme, galaxyTheme } from "../../styles/themes";
import { matchTheme } from ".";

describe("match theme function return correct theme", () => {
  test(`String of "lightTheme" returns object lightTheme`, () => {
    const input = "lightTheme";
    const output = lightTheme;

    expect(matchTheme(input)).toEqual(output);
  });
  test(`String of "galaxyTheme" returns object galaxyTheme`, () => {
    const input = "galaxyTheme";
    const output = galaxyTheme;

    expect(matchTheme(input)).toEqual(output);
  });
  test(`String of "sunriseTheme" DOES NOT return object midnightTheme`, () => {
    const input = "sunriseTheme";
    const output = midnightTheme;

    expect(matchTheme(input)).not.toEqual(output);
  });
});
