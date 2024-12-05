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
  width: 297mm; /* Landscape width */
  height: 210mm; /* Landscape height */
  background: white;
  padding: 20mm;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  page-break-after: always;
  overflow: hidden;
}

@media print {
  .page {
    page-break-after: always;
  }
}
</style>