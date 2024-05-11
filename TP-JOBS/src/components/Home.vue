<template>
    <p style="font-size: 30px;"><b>Tap on the id of the  job to see more details </b> </p>
    <div style="margin-left: 0px;width: 14%;"><span><b></b></span><router-link class="no-underline" to="/ADD"><button class="add_but">+ADD JOB</button></router-link></div><br>
    <table>
        <tr>
            <th id="up_th">ID</th>
            <th id="up_th">Titre</th>
            <th id="up_th">Description</th>
            <th id="up_th">Edit the job</th>
            <th id="up_th">Delete the job</th>
        </tr>
         <SHOW></SHOW>
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
  
