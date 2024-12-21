<script setup>
import { Question } from '../models/Question';

defineProps({
  question: {
    type: Object,
    required: true,
    validator(value) {
      return value instanceof Question;
    }
  }
});
</script>

<template>
  <div class="question">
    <div class="number1">{{ question.number1 }}</div>
    <div class="symbol">{{ question.symbol }}</div>
    <div class="number2">{{ question.number2 }}</div>
    <div class="equal"></div>
    <div class="outcome">{{ question.outcome }}</div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>