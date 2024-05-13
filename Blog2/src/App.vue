<template>
   <NavBar/>
   <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
<style>
  /* Base font and color setup */
  :root {
    --main-bg-color: #f4f4f8;
    --primary-color: #3498db; /* Blue */
    --secondary-color: #2c3e50; /* Dark Grey */
    --accent-color: #F57C00; /* Orange */
    --text-color: #333;
    --link-color: #2980b9; /* Darker Blue */
    --hover-bg-color: #34495e; /* Navy Blue */
  }

  body, #app {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--main-bg-color);
    color: var(--text-color);
    margin: 0;
    padding: 20px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .list, .tag {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .list {
    flex: 1 1 60%;
    margin-right: 80px;
  }

  .tag {
    flex: 1 1 38%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: var(--secondary-color);
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .button_det, .button_det1 {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .button_det:hover, .button_det1:hover {
    background-color: var(--link-color);
  }
</style>

