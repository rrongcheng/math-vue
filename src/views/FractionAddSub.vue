<script setup>
import { ref,watch,onMounted } from 'vue';
import { getRadomNum, getRandomSubArray,getRandomFromRange } from '../models/QuestionGenerator';
import { SYMBOL } from '../models/Question';

// Data
const allQuestions = ref([]);

// Configuration
const questionPerPage = ref(localStorage.getItem('questionPerPage') || 5);
const pageTotal   = ref(localStorage.getItem('pageTotal') || 1);
const fractionQty = ref(localStorage.getItem('fractionQty') || 6);


/* Watchers - Save config to localStorage when their value changes */
watch(questionPerPage, (newValue) => {
  localStorage.setItem('questionPerPage', newValue); 
});
watch(pageTotal, (newValue) => {
  localStorage.setItem('pageTotal', newValue); 
});
watch(fractionQty, (newValue) => {
  localStorage.setItem('fractionQty', newValue); 
});
/* End of Save config to localStorage */

/* Definition range and possibility
  For example, a range of [2,2,2,2,3,3] means:
    - value can only be 2 or 3
    - 2 has a 4/6 chance of being selected
  
  The denominator of functions in the question need to be same or have a common factor.
  This is done by setting a couple base and times.
  For example, a base of 3 and times in [1,2] means the denominator can be 3, 6.
  So the fractions in this question will be in the range of 1/3, 2/3, 1/6, 2/6, 3/6, 4/6, 5/6.
*/
const fractionBaseRange = [2,2,2,3,3,3,5];
const fractionTimesRange = [1,1,1,1,1,2,2,2,2,3,4,5];

// Operations and their percentage
const OperationRange = [
  SYMBOL.divide, 
  SYMBOL.divide, 
  SYMBOL.times, 
  SYMBOL.times, 
  SYMBOL.minus,
  SYMBOL.minus,
  SYMBOL.minus,
  SYMBOL.plus,
  SYMBOL.plus,
  SYMBOL.plus
];

const parentheisQtyRange = [2];

/* End of definition of range and possibility */

// Methods

function getRandomFaction(baseNumber){
  let fraction ={
    baseNumber: baseNumber,
    numerator: 1,
    denominator: baseNumber * getRandomFromRange(fractionTimesRange),
    getMathML: function(){
      return `
        <mfrac>
          <mn>${this.numerator}</mn>
          <mn>${this.denominator}</mn>
        </mfrac>
      `;
    }
  };
  fraction.numerator = (fraction.denominator <= 2)? 1: getRadomNum(1, fraction.denominator - 1);

  return fraction;
}


/**
 * Randomly generate parenthesis position for the question with given positions
 * @param {Array} parenthesis
 * parenthesis: 
 *   - 2D array to represent the position of parenthesis
 *   - fixed length when pass into this function
 * 
 * e.g. ((1+2)*3)/4 > parenthesis = [[open,open],[close],[close],[]]
 * 
 * e.g. (1*(2+3))/4 > [[open],[open],[close,close],[]]
 * 
 * e.g. (1+2)/(3+4) > [[open],[close],[open],[close]]
 */
function generateParenthesisPosition(parenthesis){
  let numberQty = parenthesis.length;

  // If total of number less than 2, no need to add parenthesis
  if (numberQty <= 2) {
    return parenthesis;
  }

  // Randomly pick a position to start the parenthesis from 0 to the 2nd last number 
  let startAt = getRadomNum(0, numberQty - 1 - 1);
  let endAt = null;
  let rangeTo = startAt + 1;

  /* check if enough space for the parenthesis */
  // if startAt already have parenthesis end, then skip this round
  if (parenthesis[startAt].includes('close')) {
    return parenthesis;
  }

  
  // Find a range to the end or next parenthesis
  for (let i = rangeTo; i < numberQty -1; i++){
    if (parenthesis[i].length > 0) {
      // If this position has a close parenthesis, then skip this round
      if (parenthesis[i].includes('close')) {
        return parenthesis;
      }
      // Otherwise, this position has a open parenthesis, then set the range to this position
      rangeTo = i;
      break;
    }
  }  
  // randomly pick a position to end the parenthesis
  endAt = getRadomNum(startAt+1, rangeTo);

  // if startAt and endAt already have parenthesis, then skip this round
  if (parenthesis[startAt].includes('open') 
    && parenthesis[endAt].includes('close')
  ) {
    return parenthesis;
  }

  // Add parenthesis to the position
  parenthesis[startAt].push('open');
  parenthesis[endAt].push('close');

  return parenthesis;
}

/**
 * Generate a question from fractions
 */
function generateFractionQuestion(){
  console.debug('generate Fraction question');
  let fractions = [];
  let operations = [];
  let parenthesis = [];

  const baseLimit = getRandomFromRange([1,1,1,2,2,3]);
  const parenthesisQty = getRandomFromRange(parentheisQtyRange);
  let baseRange = [];

  // Randomly pick base number range for this question
  baseRange = getRandomSubArray(fractionBaseRange, baseLimit);

  // Generate fractions for this question
  for (let i = 0; i < fractionQty.value; i++) {
    let baseNumber = getRandomFromRange(baseRange);
    fractions.push(getRandomFaction(baseNumber));
  }
  // Generate operations for this question
  for (let i = 0; i < fractionQty.value - 1; i++) {
    operations.push(getRandomFromRange(OperationRange));
  }
  
  // Generate Parenthesis for this question
  for (let i = 0; i < fractionQty.value; i++) {
    parenthesis.push([]);
  }
  for (let i = 0; i < parenthesisQty; i++) {
    parenthesis = generateParenthesisPosition(parenthesis);
  }

  // Adjust the 1st fraction to avoid negative result
  // Add whole number of length of fractions - 1 to the 1st fraction
  fractions[0].numerator += (fractions.length - 1) * fractions[0].denominator;

  // Generate question MathML
  let questionMathML = '<math>';
  for (let i = 0; i < fractions.length; i++) {
    let positionParenthesis = parenthesis[i];   
    
    // Add parenthesis star before the number(fraction)
    for (let j = 0; j < positionParenthesis.length; j++) {
      if (positionParenthesis[j] === 'open') {
        questionMathML += `<mo>${SYMBOL.parenthesisOpen}</mo>`;
      }
    }
    // add the fraction
    questionMathML += fractions[i].getMathML();

    // Add parenthesis end after the number(fraction)
    for (let j = 0; j < positionParenthesis.length; j++) {
      if (positionParenthesis[j] === 'close') {
        questionMathML += `<mo>${SYMBOL.parenthesisClose}</mo>`;
      }
    }

    // Add operation symbol
    if (i < operations.length) {
      questionMathML += `<mo>${operations[i]}</mo>`;
    }
  }
  questionMathML += '</math>';
  return questionMathML;
}

function generateQuestions(){
  allQuestions.value = [];
  for (let i = 0; i < pageTotal.value; i++) {
    const questionsSinglePage = [];
    for (let j = 0; j < questionPerPage.value; j++) {
      questionsSinglePage.push(generateFractionQuestion());
    }
    allQuestions.value.push(questionsSinglePage);
  }
}

// Lifecycle hooks
onMounted(() => {
  console.log('FractionAddSub.vue is mounted');
  generateQuestions();
})
</script>

<template>
  <div id="fraction-container">
    <div id="question-area" class="page-container " >
      <div class="page-a4-landscape" 
        v-for="(pageQuestions, pageIndex) in allQuestions" :key="pageIndex" 
      >
        <div class="printable-area">
          <div class="question" v-for="(question, questionIndex) in pageQuestions" :key="questionIndex" >
            <div class="question-content" v-html="question"></div>
            <div class="answer-line" v-for="n in 5" :key="n"></div>
          </div>
        </div>
      </div>
      
    </div>
    <div id="config-area" class="no-print">
      <h2>Fraction Operations</h2>
      <div class="mv-form-column">
        <div class="mv-form-field">
          <label for="pageTotal">Number of Pages</label>
          <input type="number" v-model="pageTotal" class="form-control" />
        </div>
        
        <div class="mv-form-field">
          <button class="btn btn-primary" @click="generateQuestions">Generate Questions</button>
        
        </div>
        <div class="mv-form-field">
          <label for="questionTotal">Number of Questions per page</label>
          <input type="number" v-model="questionPerPage" class="form-control" />
        </div>
        <div class="mv-form-field">
          <label for="fractionQty">Qty of fractions</label>
          <input type="number" v-model="fractionQty" class="form-control" />
        </div>
      </div>
    </div>
  </div>
</template>

<style >
#fraction-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#question-area {
  flex: 0 0 auto;
}
#config-area {
  flex: 0 0 auto;

}


#fraction-container .question {
  margin: 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-left: 1px dotted #ccc;
  background-color: #fff;
  font-size: 24px;

  width:250px;

  display: flex;
  flex-direction: column;
  text-align: left;
}
#fraction-container .question .question-content {
  padding-left: 20px;
}
#fraction-container .question .answer-line {
  border-bottom: 1px dotted #ccc;
  padding-bottom: 60px;
  width: 100%;
}


</style>