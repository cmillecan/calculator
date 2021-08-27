import "@testing-library/jest-dom";
import evaluate from "../index";

test("evaluates adding and subtracting", () => {
  expect(evaluate("45 + 10")).toEqual(55);
  expect(evaluate("83 + -3")).toEqual(80);
  expect(evaluate("3 + 5")).toEqual(8);
  expect(evaluate("-10 + -10")).toEqual(-20);
});

test("evaluates multiplication and division", () => {
  expect(evaluate("4 * 5 / 2")).toEqual(10);
  expect(evaluate("28 / 2")).toEqual(14);
  expect(evaluate("28 / 2 * -10")).toEqual(-140);
  expect(evaluate("86 * 3")).toEqual(258);
  expect(evaluate("7 / 2")).toEqual(3.5);
});

test("evaluates parenthesis", () => {
  expect(evaluate("1 + (10 - 5) * 2")).toEqual(11);
  expect(evaluate("(4 - 2) * 3.5")).toEqual(7);
  expect(evaluate("((6 / 2) + (7 * 5) - 4) * 10")).toEqual(340);
  expect(evaluate("10 * (-14 * (0 * 4))")).toEqual(0);
});

test("evaluates floats", () => {
  expect(evaluate("2.5 + 2.5")).toEqual(5);
  expect(evaluate("-10.5 * 2")).toEqual(-21);
  expect(evaluate("4.5 / 2")).toEqual(2.25);
  expect(evaluate("-.32 / .5")).toEqual(-0.64);
  expect(evaluate("(4 - 2) * 3.5")).toEqual(7);
});

test("evaluates mixed precedence", () => {
  expect(evaluate("10 + 4 * 5 / 2 - 1")).toEqual(19);
  expect(evaluate("2.5 * 2 - 10 / 2")).toEqual(0);
});

test("evaluates bad input", () => {
  expect(evaluate("4 ** 5 / 2")).toBeNaN();
  expect(() => {
    evaluate("2+-+-4");
  }).toThrow(new Error("Invalid Input: '+' at column 4"));
  expect(() => {
    evaluate("19 + cinnamon");
  }).toThrow(new Error("Invalid Input: 'c' at column 6"));
});
