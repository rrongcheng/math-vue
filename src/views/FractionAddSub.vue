<script setup>
import { ref,watch,onMounted } from 'vue';
import { getRadomNum } from '../models/QuestionGenerator';
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
const parentheisQtyRange = [0,0,0,1,1,2];

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

const ParenthesisRange = [
  { openAt: 1, closeAt: 5, random: true}, /* Randomly include from 1st to 5th fraction */
  { openAt: 1, closeAt: 2 }, /* include 1st and 2nd fraction */
  { openAt: 3, closeAt: 4 },
  { openAt: 0, closeAt: 0 } /* No Parenthesis */
];
/* End of definition of range and possibility */

// Methods
function getRandomFromRange(range){
  if (range.length === 0) {
    console.error('getRadomFromRange: range is empty');
    return null;
  }else if (range.length === 1) {
    return range[0];
  }else {
    return range[getRadomNum(0, range.length - 1)];
  }
}
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
// randomly pick g value from given array and push to a new array
function getRandomSubArray(array, qty){
  const result = [];
  for (let i = 0; i < qty; i++) {
    result.push(array[getRadomNum(0, array.length - 1)]);
  }
  return result;
}
function generateFractionQuestion(){
  console.debug('generate Fraction question');
  let fractions = [];
  let operations = [];

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

  // Adjust the 1st fraction to avoid negative result
  // Add whole number of length of fractions - 1 to the 1st fraction
  fractions[0].numerator += (fractions.length - 1) * fractions[0].denominator;

  // Generate question MathML
  let questionMathML = '<math>';
  for (let i = 0; i < fractions.length; i++) {
    questionMathML += fractions[i].getMathML();
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
  <div id="panel-container">
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
#panel-container {
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

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0; /* Light grey background */
}
.page-a4-landscape {
  width: 297mm; /* Landscape width */
  height: 210mm; /* Landscape height */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  page-break-after: always;
  overflow: hidden;
  background-color: #ffffff; /* White background */

  
}
.page-a4-landscape>.printable-area{
  width: 287mm; /* Landscape width - print margin */
  height: 194mm; /* Landscape height - print margin*/
  /* border: 1px solid black; */
  margin: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.question {
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
.question .question-content {
  padding-left: 20px;
}
.question .answer-line {
  border-bottom: 1px dotted #ccc;
  padding-bottom: 60px;
  width: 100%;
}

.mv-form-column {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
}
.mv-form-column .mv-form-field {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.mv-form-column .mv-form-field label {
  text-align: left;
}

@media print {

  .page-container
  ,.page-a4-landscape {
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }
  .page-a4-landscape>.printable-area {
    /* border: 1px solid black; */
    box-shadow: none;
    margin: 0px;
  }
}
</style>