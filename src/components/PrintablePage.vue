<script setup>
import QuestionComponent from './QuestionComponent.vue';

defineProps({
  pageQuestions: {
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
<div class="page-a4-landscape" :class="pageClassName">
  <QuestionComponent v-for="(question, index) in pageQuestions" :key="index" :question="question" />
</div>
</template>

