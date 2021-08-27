import { tokenize, tokenType } from "./tokens";

const getOperatorFn = (opToken) => {
  switch (opToken.type) {
    case tokenType.SLASH:
      return (a, b) => a / b;
    case tokenType.ASTERISK:
      return (a, b) => a * b;
    case tokenType.PLUS:
      return (a, b) => a + b;
    case tokenType.MINUS:
      return (a, b) => a - b;
    default:
      throw new Error(`'${opToken.value}' is not an operator`);
  }
};

const lastEl = (arr) => arr[arr.length - 1];

const lastOpHasPrecedence = (currentOp, lastOp) => {
  if (lastOp.isParenthesis()) return false;
  const currentOpType = currentOp.type;
  const lastOpType = lastOp.type;
  return !(
    (currentOpType === tokenType.ASTERISK ||
      currentOpType === tokenType.SLASH) &&
    (lastOpType === tokenType.PLUS || lastOpType === tokenType.MINUS)
  );
};

const evaluate = (input) => {
  const tokens = tokenize(input);
  const numbers = [];
  const operatorTokens = [];

  const calculateLastOp = () => {
    const lastNum = numbers.pop();
    const secondToLastNum = numbers.pop();
    const opFn = getOperatorFn(operatorTokens.pop());
    let result = opFn(secondToLastNum, lastNum);
    if (result === -0) result = +0;
    numbers.push(result);
  };

  for (let i = 0; i < tokens.length; i++) {
    const currentToken = tokens[i];
    if (currentToken.isNumber()) {
      numbers.push(currentToken.value);
    } else if (currentToken.isOperator()) {
      while (
        operatorTokens.length &&
        lastOpHasPrecedence(currentToken, lastEl(operatorTokens))
      ) {
        calculateLastOp();
      }
      operatorTokens.push(currentToken);
    } else if (currentToken.type === tokenType.LPAREN) {
      operatorTokens.push(currentToken);
    } else if (currentToken.type === tokenType.RPAREN) {
      while (lastEl(operatorTokens).type !== tokenType.LPAREN) {
        calculateLastOp();
      }
      operatorTokens.pop();
    }
  }

  while (operatorTokens.length) {
    calculateLastOp();
  }

  return numbers.pop();
};

export default evaluate;
