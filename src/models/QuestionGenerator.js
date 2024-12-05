
import { SYMBOL, Question } from './Question';
var getRadomNum = function (from, to) {
  from = from || 0;
  to = to || 20;
  let range = to - from;
  return Math.trunc(Math.random() * 1000) % range + 1 + from;
}

function generateAddition(options) {
  let defaultOptions = {
    maxOutcome: 10,
    minOutcome: 2,
    minNumber: 1,
  }
  options = Object.assign(defaultOptions, options);

  let minOutcome = Math.max(options.minOutcome, options.minNumber * 2);

  let randomOutcome = getRadomNum(minOutcome, options.maxOutcome);
  let randomNumber1 = getRadomNum(options.minNumber, randomOutcome - options.minNumber);

  let question = new Question();
  question.outcome = randomOutcome;
  question.number1 = randomNumber1;
  question.number2 = randomOutcome - randomNumber1;
  question.symbol = SYMBOL.plus;
  
  return question;
}


export {generateAddition, getRadomNum};