<script setup>
import { onMounted } from 'vue'
import './styles/question-vertical.css'; // Import the question-vertical.css file

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
      <nav class="d-flex flex-column">
        <router-link to="/natural-add-sub">Natural Add Sub</router-link>
        <router-link to="/fraction-add-sub">Fraction Add Sub</router-link>
      </nav>
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
  padding: 10px;
  background-color: #f8f9fa;
  flex-grow: 0;
}
#main-content{
  padding: 10px;
  flex-grow: 1;
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