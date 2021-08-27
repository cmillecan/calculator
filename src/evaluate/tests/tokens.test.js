import "@testing-library/jest-dom";
import { Token, tokenize, tokenType } from "../tokens";

test("tokenizes integers", () => {
  expect(tokenize("1 23 456")).toEqual([
    new Token(tokenType.INTEGER, 1),
    new Token(tokenType.INTEGER, 23),
    new Token(tokenType.INTEGER, 456),
  ]);
  expect(tokenize("-1 23")).toEqual([
    new Token(tokenType.INTEGER, -1),
    new Token(tokenType.INTEGER, 23),
  ]);
});

test("tokenizes floats", () => {
  expect(tokenize("1.5 265.10 .8 10.")).toEqual([
    new Token(tokenType.FLOAT, 1.5),
    new Token(tokenType.FLOAT, 265.1),
    new Token(tokenType.FLOAT, 0.8),
    new Token(tokenType.FLOAT, 10.0),
  ]);
});

test("tokenizes operators", () => {
  expect(tokenize("1 + 1 * 1 / 1 - 1")).toEqual([
    new Token(tokenType.INTEGER, 1),
    new Token(tokenType.PLUS, "+"),
    new Token(tokenType.INTEGER, 1),
    new Token(tokenType.ASTERISK, "*"),
    new Token(tokenType.INTEGER, 1),
    new Token(tokenType.SLASH, "/"),
    new Token(tokenType.INTEGER, 1),
    new Token(tokenType.MINUS, "-"),
    new Token(tokenType.INTEGER, 1),
  ]);
});

test("tokenizes parentheses", () => {
  expect(tokenize("( )")).toEqual([
    new Token(tokenType.LPAREN, "("),
    new Token(tokenType.RPAREN, ")"),
  ]);
});

test("ignores whitespace", () => {
  expect(tokenize("    \t \n \n \r 1    \n")).toEqual([
    new Token(tokenType.INTEGER, 1),
  ]);
});
