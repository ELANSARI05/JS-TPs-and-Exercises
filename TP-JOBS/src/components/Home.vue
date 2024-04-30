<template>
    <p style="font-size: 30px;"><b>Tap on the job to see more details </b> </p>
    <div style="margin-left: 0px;width: 14%;"><button class="add_but" @click="func()"><span><b>+</b></span> ADD JOB</button></div><br>
    <table>
        <tr>
            <th id="up_th">ID</th>
            <th id="up_th">Titre</th>
            <th id="up_th">Description</th>
            <th id="up_th">Edit the job</th>
            <th id="up_th">Delete the job</th>
        </tr>
        <tr v-for=" job in jobs">
         <SHOW :job = "job"></SHOW>
        </tr>
    </table>
    
</template>
  
<script>

import SHOW  from './SHOW.vue';
export default {
name: 'Home',
data(){
return {
   jobs: []
}},
components :{
  SHOW
},
methods : {
    func(){
        this.$router.push({ name: 'ADD' }); 
    }
},
mounted(){
        fetch('http://localhost:3000/emplois')
        .then(response => response.json())
        .then(data => this.jobs = data)
        .catch(error => console.log(error.message))
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
  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 20px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
#up_th{
    background-color: rgb(51, 49, 49);
    color : white
}
.add_but{
background-color: #3498db; /* Blue color */
  color: #fff; /* White text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
}
  </style>
  