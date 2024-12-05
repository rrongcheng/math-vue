import {generateAddition, getRadomNum} from '../src/models/QuestionGenerator';
import Question from '../src/models/Question';

test('should generateAddition generate a question correctly', () => {
  
  let question = generateAddition({
    maxOutcome: 10,
    minOutcome: 1,
    minNumber: 1,
  });

  expect(question.outcome).toBeLessThanOrEqual(10);
  expect(question.number1).toBeGreaterThanOrEqual(1);
  expect(question.number2).toBeGreaterThanOrEqual(1);
  expect(question.number1 + question.number2).toEqual(question.outcome);
});

test('should getRadomNum generate a number between 1 and 20', () => {
  let number = getRadomNum();
  expect(number).toBeGreaterThanOrEqual(1);
  expect(number).toBeLessThanOrEqual(20);
});