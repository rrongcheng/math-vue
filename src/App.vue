<script setup>
import { onMounted } from 'vue'
import './styles/question-vertical.css'; // Import the question-vertical.css file
import './styles/question-horizontal.css'; // Import the question-vertical.css file

// Data
// Methods


// Lifecycle hooks
onMounted(() => {
  console.log('App.vue is mounted');
})
</script>
<template>
  <div id="main-page">
    <div id="main-menu" class="no-print">
      <div class="menu-item"><router-link to="/natural-add-sub">Natural Add Sub</router-link></div>
      <div class="menu-item"><router-link to="/natural-multiple">Natural Multiple</router-link></div>
      <div class="menu-item"><router-link to="/natural-division">Natural Division</router-link></div>
      
      <div class="menu-item"><router-link to="/fraction-add-sub">Fraction Add Sub</router-link></div>
      
    </div>
    <div id="main-content" >
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

  /* Main-page is a 2 column row 
    - the left column is the menu
      - the menu is a vertical nav
      - the menu is 30% wide
    - the right column is the content
      - the content is 70% wide
      - the content is a router-view
  */
  #main-page{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  #main-menu{
    flex: 0 0 auto;
    padding: 20px;
  }
  #main-content{
    flex: 0 0 auto;
  }



</style>