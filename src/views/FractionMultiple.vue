<script setup>
import { ref,watch,onMounted } from 'vue';
import { generateMultiple, getRandomFromRange } from '../models/QuestionGenerator';


// Data
const questionPerPage = ref(120);
const pageTotal = ref(1);
const allQuestions = ref([]);
const pageQuestionLayout = ref(localStorage.getItem('pageQuestionLayout') || 'question-vertical'); // Retrieve from localStorage or set default
const maxOutcome = ref(localStorage.getItem('maxOutcome') ||50)
const availableOperations = ref(['multiplication','division']);

// Methods
function generateQuestions(){
  allQuestions.value = [];
  for (let i = 0; i < pageTotal.value; i++) {
    const questionsSinglePage = [];
    for (let j = 0; j < questionPerPage.value; j++) {
      let newQuestion = generateMultiple({        
        maxMultiplicand: 9,
        maxMultiplier: 9,
        minMultiplicand: 2,
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
    <h2>自然数乘除法</h2>
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
            <input type="checkbox" name="multiplication" value="multiplication" v-model="availableOperations">
            <label for="availableOperations">Multiple</label>
          </div>
          <div>
            <input type="checkbox" name="division" value="division" v-model="availableOperations">
            <label for="availableOperations">Division</label>
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

  .question-horizontal .question {
    width: 33mm;
    margin-bottom: 2mm;
    align-items: center;
  }
  .question-horizontal .question .outcome {
    color: transparent;        /* Hides the content but keeps the space */
    
  }

</style>