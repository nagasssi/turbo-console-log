// Sample file for testing Turbo Console Log extension

function calculateSum(a, b) {
  const result = a + b;
  return result;
}

class Calculator {
  multiply(x, y) {
    const product = x * y;
    return product;
  }

  divide(x, y) {
    if (y === 0) {
      return null;
    }
    const quotient = x / y;
    return quotient;
  }
}

const numbers = [1, 2, 3, 4, 5];
const sum = calculateSum(10, 20);

const calc = new Calculator();
const product = calc.multiply(5, 3);
const division = calc.divide(15, 3);

const userData = {
  name: "John Doe",
  age: 30,
  email: "john@example.com"
};

function processData(data) {
  const processed = { ...data, processed: true };
  return processed;
}

const result = processData(userData);
