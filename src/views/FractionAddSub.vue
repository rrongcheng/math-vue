<script setup>
import { ref,watch,onMounted, defineEmits } from 'vue';
import { SYMBOL, Question } from '../models/Question';
import { getRadomNum } from '../models/QuestionGenerator';

const emit = defineEmits(['questionGenerated','pageClassNameChanged']);


// Data
const questionPerPage = ref(9);
const pageTotal = ref(1);


// Methods
function generateFraction(){
  const numerator = getRadomNum(1, 10);
  const denominator = getRadomNum(2, 10);
  return `${numerator}/${denominator}`;
}
function generateQuestions(){
  let allQuestions = [];
  for (let i = 0; i < pageTotal.value; i++) {
    const questionsSinglePage = [];
    for (let j = 0; j < questionPerPage.value; j++) {
      questionsSinglePage.push(generateFraction());
    }
    allQuestions.push(questionsSinglePage);
  }

  // send the generated questions to the parent component
  emit('questionGenerated', allQuestions);
}

// Lifecycle hooks
onMounted(() => {
  console.log('NaturalAddSub is mounted');
  generateQuestions();
  emit('pageClassNameChanged', 'question-fraction');
})
</script>

<template>
  <div class="row">
    <div id="printable-area" class="col-auto" >
      <PrintablePage v-for="(page, index) in allQuestions" 
        :key="index" 
        :pageQuestions="page" 
        :pageClassName="pageQuestionLayout"
      />
    </div>
  <div class="col-2 no-print">
    <h2>Fraction Operations</h2>
    <div class="row">
      <div class="col-auto">
        <label for="questionTotal">Number of Questions per page</label>
        <input type="number" v-model="questionPerPage" class="form-control" />
      </div>
      <div class="col-auto">
        <label for="pageTotal">Number of Pages</label>
        <input type="number" v-model="pageTotal" class="form-control" />
      </div>
      <div class="col-auto">
        <label for="pageQuestionLayout">Page Question Layout</label>
        <select v-model="pageQuestionLayout" class="form-select"
        >
          <option value="question-horizontal">Horizontal</option>
          <option value="question-vertical">Vertical</option>
        </select>
      </div>
      <div class="col-auto">
        <label for="maxOutcome">Max outcome</label>
        <input type="number" v-model="maxOutcome" class="form-control" />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="generateQuestions">Generate Questions</button>

      </div>
    </div>
  </div>
  </div>
</template>