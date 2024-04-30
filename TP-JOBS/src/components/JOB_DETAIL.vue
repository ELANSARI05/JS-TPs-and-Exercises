<template>
    <div v-for="job in jobs">
       <div class="details1" v-if="job.id == jobId">
        <p style="font-size: 30px;"><b>Details for the job with id : <span><b>{{ jobId }}</b></span></b></p><br><br>
            <label><span><b>The title : </b></span> {{ job.titre }} </label><br><br><br>
            <label><span><b> The description : </b></span> {{ job.description }} </label><br><br><br>
            <label><span><b>The place : </b></span> {{ job.lieu }}</label> <br><br><br>
            <label><span><b>The salary :</b></span>  {{ job.salaire }}</label> <br><br><br>
            <label><span><b>The type : </b></span> {{ job.type }}</label> <br><br><br>

       </div>
    </div><br>
    <button class="redirect"@click="func()">Redirect</button>
  </template>
  
  <script>
  export default {
    name: 'JOB_DETAIL',
    data() {
     return {
        jobs : [],
        jobId: parseInt(this.$route.params.id),
    };
  },
    methods : {
        func(){
            this.$router.push({ name: 'Home'  }); 
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
    .details1{
        border: groove;
        border-color: blue;
        border-width: 20px;
        width: 50%;
        margin-left: 25%
        
    }
    .redirect{
        background-color: rgb(250, 66, 66); 
        color: #fff; /* White text */
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
  </style>
  