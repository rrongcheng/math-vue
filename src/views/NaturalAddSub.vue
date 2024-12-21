<script setup>
import { ref,watch,onMounted, defineEmits } from 'vue';
import PrintablePage from '../components/PrintablePage.vue';
import { generateAddition } from '../models/QuestionGenerator';

// Data
const questionPerPage = ref(98);
const pageTotal = ref(1);
const allQuestions = ref([]);
const pageQuestionLayout = ref(localStorage.getItem('pageQuestionLayout') || 'question-vertical'); // Retrieve from localStorage or set default
const maxOutcome = ref(localStorage.getItem('maxOutcome') ||50)

// Methods
function generateQuestions(){
  allQuestions.value = [];
  for (let i = 0; i < pageTotal.value; i++) {
    const questionsSinglePage = [];
    for (let j = 0; j < questionPerPage.value; j++) {
      questionsSinglePage.push(generateAddition({
        maxOutcome: maxOutcome.value,
        minOutcome: 30,
        minNumber: 2,
      }));
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
  <div class="row">
    <div id="printable-area" class="col-auto" >
      <PrintablePage v-for="(page, index) in allQuestions" 
        :key="index" 
        :pageQuestions="page" 
        :pageClassName="pageQuestionLayout"
      />
    </div>
  <div class="col-2 no-print">
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
<style scoped>
#printable-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px; */
  background-color: #f0f0f0; /* Light grey background */
}
.page-a4-landscape {
  width: 287mm; /* Landscape width */
  height: 200mm; /* Landscape height */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  page-break-after: always;
  overflow: hidden;
  margin-left: 5mm;
  margin-right: auto;
  margin-bottom: 50px;
}
@media print {

  #printable-area {
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }
  .page-a4-landscape {
    /* border: 1px solid black; */
    box-shadow: none;
    margin-bottom: 0px;
  }
}
</style>