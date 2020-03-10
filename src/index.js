function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {

  // Убираем пробелы из строки
  expr = expr.replace(/\s/g, "");
  console.log(expr);

  // Проверка валидности скобок
  let leftBrackets = 0,
    rightBrackets = 0;
  expr.split("").forEach(char => {
    if (char === "(") leftBrackets++;
    if (char === ")") rightBrackets++;
  });
  if (leftBrackets !== rightBrackets) throw new Error("ExpressionError: Brackets must be paired");

  // Ищем скобки
  let innerLBracket = expr.lastIndexOf("("),
    innerRBracket = expr.indexOf(")", innerLBracket);
  // Рекурсивно вычисляем выражение в скобках
  if (innerLBracket >= 0) {
    return expressionCalculator(expr.slice(0, innerLBracket) + expressionCalculator(expr.slice(innerLBracket + 1, innerRBracket)) + expr.slice(innerRBracket + 1));
  }

  let array = expr.split(/[\*+\-\/]/g).map(x => +x), // строки в числа
    operators = expr.split(/[\d]*[.]*[\d]*/g);
  console.log(array);

  // Решаем минус в начале строки
  
  if (array[0] !== 0 && operators[0] !== '-') {
    operators.splice(0, 1);
  }
  operators.splice(-1, 1);
  console.log(operators);

  while (array.length > 1) {
    let multiply = operators.indexOf('*'),
      divide = operators.indexOf('/'),
      minus = operators.indexOf('-'),
      plus = operators.indexOf('+');
    if (divide != -1) {
      if (array[divide + 1] === 0) throw new TypeError('TypeError: Division by zero.');
      array.splice(divide, 2, array[divide] / array[divide + 1]);
      operators.splice(divide, 1);
      continue;
    }
    if (multiply != -1) {
      array.splice(multiply, 2, array[multiply] * array[multiply + 1]);
      operators.splice(multiply, 1);
      continue;
    }
    if (minus != -1) {
      array.splice(minus, 2, (array[minus] - array[minus + 1]));
      operators.splice(minus, 1);
      continue;
    }
    if (plus != -1) {
      array.splice(plus, 2, array[plus] + array[plus + 1]);
      operators.splice(plus, 1);
      continue;
    } else break;
  }

  return array[0];
}

module.exports = {
  expressionCalculator
}

let x = " (  97 / 48 + 86 + 56 * 94  ) / 43 + 57 ";
let y = " (  68 - 85 / 75 * 64  ) / 15 + 73 ";
let z = '-4.533333333333331/15+73';
console.log(expressionCalculator(z));
