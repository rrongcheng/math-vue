<script setup>
import { ref, watch, onMounted } from 'vue'
import './styles/question-vertical.css'; // Import the question-vertical.css file

// Data
const pageClassName = ref('');
const allQuestions = ref([]);

// Methods
function setQuestionAll(value){
  allQuestions.value = value;
}


// Lifecycle hooks
onMounted(() => {
  console.log('App.vue is mounted');
})
</script>
<template>
  <div class="row">
    <div class="col-2 no-print">
      <nav class="d-flex flex-column">
        <router-link to="/natural-add-sub">Natural Add Sub</router-link>
        <router-link to="/fraction-add-sub">Fraction Add Sub</router-link>
      </nav>
    </div>
    <div class="col-10">
      <router-view />
    </div>
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



@media print {
  @page {
    size: A4 landscape; /* Set the page size and orientation */
  }

  .no-print
  ,#__vue-devtools-container__
  ,#vue-inspector-container
  {
    display:none;
  }

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