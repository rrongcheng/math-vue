<script setup>
import { ref,watch,onMounted, defineEmits } from 'vue';
import { generateAddition } from '../models/QuestionGenerator';

const emit = defineEmits(['questionGenerated','pageClassNameChanged']);


// Data
const questionPerPage = ref(98);
const pageTotal = ref(1);
const questionsEveryPages = ref([]);
const pageQuestionLayout = ref(localStorage.getItem('pageQuestionLayout') || 'question-vertical'); // Retrieve from localStorage or set default
const maxOutcome = ref(50)

// Methods
function generateQuestions(){
  console.log('pageTotal:', pageTotal.value);
  console.log('questionPerPage:', questionPerPage.value);
  let allQuestions = [];
  for (let i = 0; i < pageTotal.value; i++) {
    const questionsSinglePage = [];
    for (let j = 0; j < questionPerPage.value; j++) {
      questionsSinglePage.push(generateAddition({
        maxOutcome: 50,
        minOutcome: 30,
        minNumber: 2,
      }));
    }
    allQuestions.push(questionsSinglePage);
  }

  // send the generated questions to the parent component
  emit('questionGenerated', allQuestions);
}
// Watchers
watch(pageQuestionLayout, (newValue) => {
  localStorage.setItem('pageQuestionLayout', newValue); // Save to localStorage
});

// Lifecycle hooks
onMounted(() => {
  console.log('NaturalAddSub is mounted');
  generateQuestions();
  emit('pageClassNameChanged', pageQuestionLayout);
})
</script>

<template>
  <h2>Natural Add Sub</h2>
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
            @change="emit('pageClassNameChanged', pageQuestionLayout)"
          >
            <option value="question-horizontal">Horizontal</option>
            <option value="question-vertical">Vertical</option>
          </select>
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click="generateQuestions">Generate Questions</button>

        </div>
      </div>
</template>