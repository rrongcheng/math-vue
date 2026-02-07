<script setup>
import { ref,watch,onMounted } from 'vue';
import { generateMultiple, getRandomFromRange } from '../models/QuestionGenerator';
import { SYMBOL } from '@/models/Question';

// Data
const questionPerPage = ref(14);
const pageTotal = ref(1);
const allQuestions = ref([]);
const pageQuestionLayout = ref(localStorage.getItem('pageQuestionLayout') || 'question-vertical'); // Retrieve from localStorage or set default
const maxOutcome = ref(localStorage.getItem('maxOutcome') ||50)
const availableOperations = ref(['addition','subtraction']);

// Methods
function generateQuestions(){
  allQuestions.value = [];
  for (let i = 0; i < pageTotal.value; i++) {
    const questionsSinglePage = [];
    for (let j = 0; j < questionPerPage.value; j++) {
      let newQuestion = generateMultiple({
        maxMultiplicand: 999,
        minMultiplicand: 100,
        maxMultiplier: 9,
        minMultiplier: 2,
      });
      questionsSinglePage.push(newQuestion);
    }
    allQuestions.value.push(questionsSinglePage);
  }
}
// Watchers
// Save to localStorage when the value changes
watch(pageQuestionLayout, (newValue) => {
  localStorage.setItem('pageQuestionLayout', newValue); 
});
watch(maxOutcome, (newValue) => {
  localStorage.setItem('maxOutcome', newValue); 
});

// Lifecycle hooks
onMounted(() => {
  console.log('NaturalAddSub is mounted');
  generateQuestions();
})
</script>

<template>
  <div id="natural-container" >
    <div id="question-area" class="page-container " >
      <div class="page-a4-landscape" :class="pageQuestionLayout"
        v-for="(pageQuestions, pageIndex) in allQuestions" :key="pageIndex"
      >
        <div class="printable-area">
          <div class="question" v-for="(question, questionIndex) in pageQuestions" :key="questionIndex">
            <div class="number1">{{ question.number1 }}</div>
            <div class="symbol" v-html="question.symbol"></div>
            <div class="number2">{{ question.number2 }}</div>
            <div class="equal"></div>
            <div class="outcome">{{ question.outcome }}</div>
          </div>
        </div>
      </div>
    </div>
  <div id="config-area" class="no-print">
    <h2>Natural Add Sub</h2>
    <div class="mv-form-column">
      <div class="mv-form-field">
        <button class="btn btn-primary" @click="generateQuestions">Generate Questions</button>

      </div>
      <div class="mv-form-field">
        <label for="questionTotal">Number of Questions per page</label>
        <input type="number" v-model="questionPerPage" class="form-control" />
      </div>
      <div class="mv-form-field">
        <label for="pageTotal">Number of Pages</label>
        <input type="number" v-model="pageTotal" class="form-control" />
      </div>
      <div class="mv-form-field">
        <label for="pageQuestionLayout">Page Question Layout</label>
        <select v-model="pageQuestionLayout" class="form-select"
        >
          <option value="question-horizontal">Horizontal</option>
          <option value="question-vertical">Vertical</option>
        </select>
      </div>
      <div class="mv-form-field">
        <label for="maxOutcome">Max outcome</label>
        <input type="number" v-model="maxOutcome" class="form-control" />
      </div>

      <!-- Config Operations -->
      <div class="mv-form-field">
        <fieldset>
          <legend>Operations</legend>
          <div>
            <input type="checkbox" name="addition" value="addition" v-model="availableOperations">
            <label for="availableOperations">Addition</label>
          </div>
          <div>
            <input type="checkbox" name="subtraction" value="subtraction" v-model="availableOperations">
            <label for="availableOperations">Subtraction</label>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
  </div>
</template>
<style scoped>
#natural-container {
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
/* Define question style for Long Division
  number1 = quotient 商  - hidden
  number2 = divisor  除数 
  outcome = dividend 被除数
  symbol
*/
.question-horizontal .question{
  width: 38mm;
  padding-top: 10mm; /* the space for quotient */
  display: inline-grid;
  grid-template-columns: auto 1fr;
  align-items: start; 
  font-family: 'Comic Sans MS', cursive, sans-serif; 
}
.question-horizontal .question .number1 {
  display: none;
}
.question-horizontal .question .symbol {
  display: none;
}
.question-horizontal .question .equal {
  display: none;
}
.question-horizontal .question .number2{
  order: 1; /* flex display order =1 */
  position: relative;
  padding-right: 0.5em;  
}
/* add  */
.question-horizontal .question .number2::after{
  content: '⇃';
  font-size: 2em;
  top: -0.38em;
  right: -0.16em;
  position: absolute;
}
.question-horizontal .question .outcome{
  order: 2;
  border-top: 2px solid black;  /* 除号上方的横线 */
  text-align: left;
  padding-left: 0.7em;
  letter-spacing: 0.8em;
}
</style>