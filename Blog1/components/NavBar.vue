<template>
    <router-link to="/Home"><button class="home">Home</button></router-link>
    <router-link to="/Create"><button class="add">ADD article</button></router-link>
</template>
  
  <script>
  
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .home{
background-color: #3498db; /* Blue color */
  color: #fff; /* White text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
}
.add{
    background-color: green; /* Blue color */
  color: #fff; /* White text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
  margin-left: 20px;
}
  </style>
  