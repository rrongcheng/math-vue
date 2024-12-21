# math-vue

## Demo
https://rrongcheng.github.io/math-vue/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Upgrade Vue.js
```
npm install vue@latest
npm install vue-router@latest
npm install core-js@latest
npm install eslint-plugin-vue@latest
npm install @babel/core@latest
npm install eslint@latest



```

## Project Summary

This Vue.js project is a math question generator and printer. It allows users to configure the number of questions per page, the number of pages, and the page layout. The questions are generated using the `QuestionGenerator` class and displayed in a printable format. The project uses Vue Router for navigation between different views and is configured for deployment to GitHub Pages. The project also includes Jest tests to ensure the functionality of the `QuestionGenerator` class. The CSS is organized into global styles and specific styles for printable pages. The `pageQuestionLayout` is saved to local storage to maintain the user's selection across sessions.

### Project Structure

Your project is organized with the following structure:
src/
  components/
    MathQuestion.vue
    PrintablePage.vue
  models/
    Question.js
    QuestionGenerator.js
    operations.js
  router/
    index.js
  styles/
    global.css
    page-vertical.css
  views/
    Home.vue
    About.vue
  App.vue
  main.js
  vue.config.js
tests/
  QuestionGenerator.test.js


### Key Components and Files

1. **Components**
   - **MathQuestion.vue**: A component that displays a math question. It uses props to receive a `Question` object and displays its properties.
   - **PrintablePage.vue**: A component that is used to display individual questions within a printable page.

2. **Models**
   - **Question.js**: Defines the `Question` class, which includes two numbers, an operation, and the outcome. The operation can be addition, subtraction, multiplication, or division.
   - **QuestionGenerator.js**: Defines the `QuestionGenerator` class, which generates random math questions based on a given configuration.
   - **operations.js**: Defines the operation classes (`Addition`, `Subtraction`, `Multiplication`, `Division`), each with a symbol and a method to calculate the outcome.

3. **Router**
   - **index.js**: Configures Vue Router with routes for the `Home` and `About` views.

4. **Styles**
   - **global.css**: Contains global styles for the project.
   - **page-vertical.css**: Contains styles specific to the `.page-vertical` class, used for printable pages.

5. **Views**
   - **Home.vue**: A view component for the home page.
   - **About.vue**: A view component for the about page.

6. **Main Files**
   - **App.vue**: The root component of the application. It includes a form to configure the number of questions per page, the number of pages, and the page layout. It also includes the `#printable-area` where the questions are displayed.
   - **main.js**: The entry point of the application. It creates the Vue app, configures the router, and mounts the app to the DOM.
   - **vue.config.js**: Configuration file for Vue CLI. It sets the `publicPath` for GitHub Pages deployment.

7. **Tests**
   - **QuestionGenerator.test.js**: Contains Jest tests for the `QuestionGenerator` class to ensure it correctly adds questions, generates random questions within a specified range, and generates multiple questions.

### Functionality

1. **Question Generation**
   - The `QuestionGenerator` class generates random math questions based on a given configuration. It supports addition, subtraction, multiplication, and division operations.
   - The `generateQuestions` method in `App.vue` uses the `QuestionGenerator` to generate questions and store them in the `pageQuestions` array.

2. **Printing**
   - The `#printable-area` is styled to display multiple A4-sized pages with a grey gap between them.
   - The `@media print` CSS rule ensures that only the `#printable-area` is shown when printing, and all other elements are hidden and do not take up space.

3. **Routing**
   - Vue Router is configured with routes for the `Home` and `About` views. The `App.vue` component includes navigation links to these views using `<router-link>`.

4. **Local Storage**
   - The `pageQuestionLayout` is saved to and retrieved from local storage to maintain the user's selection across page reloads.

5. **Deployment**
   - The project is configured for deployment to GitHub Pages. The `publicPath` is set in `vue.config.js`, and the `gh-pages` package is used to deploy the project.

