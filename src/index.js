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

  // Пребразуемстроки в числа
  let array = expr.split(/[\*+\-\/]/g).map(x => +x),
    operators = expr.split(/[\d]*[.]*[\d]*/g);

  // Убираем пустые значения в начале и в конце массивф операторов 
  if (array[0] !== 0 && operators[0] !== '-') {
    operators.splice(0, 1);
  }
  operators.splice(-1, 1);

  // Обрабатываем отрицательные числа
  for (let isZero = 0; isZero < array.length; isZero++) {
    if (array[isZero] == 0 && operators[isZero] == '-') {
      array.splice(isZero, 2, (array[isZero] - array[isZero + 1]));
      operators.splice(isZero, 1);
    }
  }

  // Производим арифметические действия
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
    } else {
      break;
    }
  }

  return array[0];
}

module.exports = {
  expressionCalculator
}

let x = " (  97 / 48 + 86 + 56 * 94  ) / 43 + 57 ";
let y = "136*-111.42857142857144/18/84";
let z = ' (  38 + 52 + 65 - 19  ) * (  72 * 3 / 36 * (  9 / 2 - 17 * 38 / 28  )  ) / 18 / 84 ';
console.log(expressionCalculator(z));
