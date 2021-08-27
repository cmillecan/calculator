export const tokenType = {
  ASTERISK: "ASTERISK",
  SLASH: "SLASH",
  PLUS: "PLUS",
  MINUS: "MINUS",
  LPAREN: "LPAREN",
  RPAREN: "RPAREN",
  INTEGER: "INTEGER",
  FLOAT: "FLOAT",
};

const isWhiteSpace = (char) => {
  return char === " " || char === "\n" || char === "\t" || char === "\r";
};

const isNumber = (char) => {
  return char >= "0" && char <= "9";
};

const getNumberTokenFromNdx = (input, ndx) => {
  const result = [];
  // keep track of whether we have seen a decimal or not, only allow one
  let hasDecimal = false;
  while (ndx < input.length) {
    const currentChar = input[ndx];
    if (isNumber(currentChar)) {
      result.push(currentChar);
    } else if (currentChar === ".") {
      if (hasDecimal) {
        throwInputError(currentChar, ndx);
      }
      result.push(currentChar);
      hasDecimal = true;
    } else {
      // move ndx back one so it can be re-examined by the main tokenize loop
      ndx--;
      break;
    }
    ndx++;
  }

  const numString = result.join("");

  if (hasDecimal) {
    return { token: new Token(tokenType.FLOAT, parseFloat(numString)), ndx };
  }

  return { token: new Token(tokenType.INTEGER, parseInt(numString)), ndx };
};

export class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  isNumber() {
    return this.type === tokenType.INTEGER || this.type === tokenType.FLOAT;
  }

  isOperator() {
    return (
      this.type === tokenType.PLUS ||
      this.type === tokenType.MINUS ||
      this.type === tokenType.ASTERISK ||
      this.type === tokenType.SLASH
    );
  }

  isParenthesis() {
    return this.type === tokenType.LPAREN || this.type === tokenType.RPAREN;
  }
}

export const tokenize = (input) => {
  const tokens = [];

  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (isWhiteSpace(char)) continue;

    let isNegative = false;
    switch (char) {
      case "(":
        tokens.push(new Token(tokenType.LPAREN, char));
        break;
      case ")":
        tokens.push(new Token(tokenType.RPAREN, char));
        break;
      case "+":
        tokens.push(new Token(tokenType.PLUS, char));
        break;
      case "*":
        tokens.push(new Token(tokenType.ASTERISK, char));
        break;
      case "/":
        tokens.push(new Token(tokenType.SLASH, char));
        break;
      case "-":
        const lastToken = tokens[tokens.length - 1];
        if (
          !tokens.length ||
          (lastToken && lastToken.isOperator()) ||
          (lastToken && lastToken.type === tokenType.LPAREN)
        ) {
          isNegative = true;
          i++;
          char = input[i];
          // don't break for negative, instead fallthrough to default number tokenizer
        } else {
          tokens.push(new Token(tokenType.MINUS, char));
          break;
        }
      default:
        if (isNumber(char) || (char === "." && isNumber(input[i + 1]))) {
          const { token, ndx } = getNumberTokenFromNdx(input, i);
          i = ndx;
          if (isNegative) {
            token.value = -token.value;
            isNegative = false;
          }
          tokens.push(token);
        } else {
          throwInputError(char, i);
        }
    }
  }

  return tokens;
};

const throwInputError = (char, i) => {
  throw new Error(`Invalid Input: '${char}' at column ${i + 1}`);
};
