const SYMBOL = {
  plus : '+',
  minus: '-' ,
  times: '&times;',
  divide: '&divide;',
  equals: '=',
  notEquals : '&ne;'

}


class Question {
  constructor(number1, number2, symbol, outcome) {
    this.number1 = number1;
    this.number2 = number2;
    this.symbol = symbol;
    this.outcome = outcome;
  }
}

export { SYMBOL, Question };