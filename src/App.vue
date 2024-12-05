<script setup>
import { ref, watch, onMounted } from 'vue'
import PrintablePage from './components/PrintablePage.vue';
import { generateAddition } from './models/QuestionGenerator';
import './styles/question-vertical.css'; // Import the question-vertical.css file

// Data
const questionPerPage = ref(90);
const pageTotal = ref(1);
const questionsEveryPages = ref([]);
const pageQuestionLayout = ref(localStorage.getItem('pageQuestionLayout') || 'question-vertical'); // Retrieve from localStorage or set default
const maxOutcome = ref(30)
// Methods

function generateQuestions(){
  questionsEveryPages.value.length = 0; // Empty the array
  for (let i = 0; i < pageTotal.value; i++) {
    const questionsSinglePage = [];
    for (let j = 0; j < questionPerPage.value; j++) {
      questionsSinglePage.push(generateAddition({
        maxOutcome: 30,
        minOutcome: 4,
        minNumber: 2,
      }));
    }
    questionsEveryPages.value.push(questionsSinglePage);
  }
}

// Watchers
watch(pageQuestionLayout, (newValue) => {
  localStorage.setItem('pageQuestionLayout', newValue); // Save to localStorage
});

// Lifecycle hooks
onMounted(() => {
  console.log('Component is mounted');
  generateQuestions();
})
</script>
<template>
  <div id="app" class="row">
    <div class="col-2">
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
          <select v-model="pageQuestionLayout" class="form-select">
            <option value="question-horizontal">Horizontal</option>
            <option value="question-vertical">Vertical</option>
          </select>
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click="generateQuestions">Generate Questions</button>

        </div>
      </div>
    </div>
    <div id="printable-area" class="col-auto">
      <PrintablePage v-for="(page, index) in questionsEveryPages" 
        :key="index" 
        :questionAll="page" 
        :pageClassName="pageQuestionLayout"
      />
    </div>
    <router-view />
  </div>
</template>
<style>
/* Add any global styles here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#printable-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Grey gap between pages */
  padding: 20px;
  background-color: #f0f0f0; /* Light grey background */
}


@media print {
  @page {
    size: A4 landscape; /* Set the page size and orientation */
  }

  body * {
    visibility: hidden;
  }
  #printable-area, #printable-area * {
    visibility: visible;
  }
  #printable-area {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    box-shadow: none;
    page-break-after: always;
  }
}


</style>