<script setup>
import { defineProps } from 'vue';
import QuestionComponent from './QuestionComponent.vue';

defineProps({
  questionAll: {
    type: Array,
    required: true
  },
  pageClassName: {
    type: String,
    default: ''
  }
});

</script>

<template>
<div class="page" :class="pageClassName">
  <QuestionComponent v-for="(question, index) in questionAll" :key="index" :question="question" />
</div>
</template>

<style> 
.page {
  width: 287mm; /* Landscape width */
  height: 200mm; /* Landscape height */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  page-break-after: always;
  overflow: hidden;
  margin-left: 5mm;
  margin-right: auto;
}

@media print {
  .page {
    /* border: 1px solid black; */
    box-shadow: none;
  }
}
</style>