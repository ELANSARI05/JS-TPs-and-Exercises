<template>
    <div>
    <router-link @click="tohome()" v-show="a" to="/Home">Home</router-link> 
    </div>
  <router-view/>
</template>

<script>

export default {
name: 'App',
components :{
   
},
data(){
  return {
    a : true
  }
},
methods : {
  tohome(){
    this.a = false
  }
}
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
.title {
  font-size: 40px; /* Adjust the font size as needed */
  font-weight: bold;
  color: #333; /* Choose a suitable color */
  text-transform: uppercase; /* Optional: Convert text to uppercase */
  margin-bottom: 10px; /* Optional: Add margin for spacing */
}

</style>
