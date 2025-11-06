
import { SYMBOL, Question } from './Question';
/**
 * @param {number} from 
 * @param {number} to 
 * @returns  a random number between from and to
 */
var getRadomNum = function (from, to) {
  from = from || 0;
  to = to || 20;
  let range = to - from + 1;
  return Math.trunc(Math.random() * 1000) % range + from;
}

/**
 * 
 * @param {Array} array 
 * @param {number} qty 
 * @returns  a random sub array of given array
 */
function getRandomSubArray(array, qty){
  const result = [];
  for (let i = 0; i < qty; i++) {
    let randomIndex = getRadomNum(0, array.length - 1);
    result.push(array[randomIndex]);
  }
  return result;
}

/**
 * 
 * @param {[]} range 
 * @returns a random element from the given range
 */
function getRandomFromRange(range){
  if (range.length === 0) {
    console.error('getRadomFromRange: range is empty');
    return null;
  }else if (range.length === 1) {
    return range[0];
  }else {
    let randomIndex = getRadomNum(0, range.length - 1);
    return range[randomIndex];
  }
}

/**
 * 
 * @param {Object} options 
 * @returns  a question with addition operation
 */
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

/**
 * 
 * @param {Object} options 
 * @returns  a question with multiple operation
 */
function generateMultiple(options) {
  let defaultOptions = {
    maxMultiplicand: 9,
    maxMultiplier: 9,
    minMultiplicand: 1,
    minMultiplier: 1,
  }
  options = Object.assign(defaultOptions, options);


  let randomMultiplicand = getRadomNum(options.minMultiplicand, options.maxMultiplicand);
  let randomultiplier = getRadomNum(options.minMultiplier, options.maxMultiplier);

  let question = new Question();
  question.outcome = randomMultiplicand * randomultiplier;
  question.number1 = randomMultiplicand;
  question.number2 = randomultiplier;
  question.symbol = SYMBOL.times;
  
  return question;
}


export {generateAddition, getRadomNum, getRandomSubArray
  ,getRandomFromRange,generateMultiple
};