class QuestionGenerator {
  constructor() {
    this.questions = [];
  }

  addQuestion(number1, number2, symbol) {
    let outcome;
    
    switch (symbol) {
      case '+':
        outcome = number1 + number2;
        break;
      case '-':
        outcome = number1 - number2;
        break;
      case '*':
        outcome = number1 * number2;
        break;
      case '/':
        outcome = number2 !== 0 ? number1 / number2 : 'undefined';
        break;
      default:
        throw new Error('Invalid symbol');
    }

    const question = {
      number1,
      number2,
      symbol,
      outcome
    };

    this.questions.push(question);
  }

  generateRandomQuestion(config) {
    const { operations, maxOutcome } = config;
    let number1, number2, symbol, outcome;

    do {
      number1 = Math.floor(Math.random() * 10) + 1;
      number2 = Math.floor(Math.random() * 10) + 1;
      symbol = operations[Math.floor(Math.random() * operations.length)];

      switch (symbol) {
        case '+':
          outcome = number1 + number2;
          break;
        case '-':
          outcome = number1 - number2;
          break;
        case '*':
          outcome = number1 * number2;
          break;
        case '/':
          outcome = number2 !== 0 ? number1 / number2 : 'undefined';
          break;
        default:
          throw new Error('Invalid symbol');
      }
    } while (outcome > maxOutcome || outcome === 'undefined');

    this.addQuestion(number1, number2, symbol);
  }

  getQuestions() {
    return this.questions;
  }
}

export default QuestionGenerator;