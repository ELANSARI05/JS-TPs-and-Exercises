<template>
    <tr v-for=" job in jobs" >
    <th @click="show_details(job)"><b>{{job.id}}</b></th>
    <th><b>{{job.titre}}</b></th>
    <td>{{job.description}}</td>
    <th><router-link :to="{ name: 'EDIT', params: { id: job.id } }" class="no-underline"><button class="button_det" >Edit</button></router-link></th>
    <th><button class="button_det1" @click="job_delete(job)">Delete</button></th>
    </tr>
</template>
  
<script>
export default {
  name: 'SHOW',
  data(){
    return {
    jobs: []
    }},
  mounted(){
        fetch('http://localhost:4000/emplois')
        .then(response => response.json())
        .then(data => this.jobs = data)
        .catch(error => console.log(error.message))
    },
  methods: {
    show_details(job) {
        this.$router.push({ name: 'JOB_DETAIL', params: { id: job.id } }); 
    },
    job_delete(job) {
            fetch('http://localhost:4000/emplois/' + job.id, {
                method: 'DELETE'
            })
            .then(() => this.jobs = this.jobs.filter(job1 => job1.id !== job.id))
            .catch(error => console.log(error.message))
        }
  },
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
  .button_det {
  background-color: #3498db; /* Blue color */
  color: #fff; /* White text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.button_det1 {
  background-color: red; /* Blue color */
  color: #fff; /* White text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

/* Hover effect */
.button_det :hover {
  background-color: #2980b9; /* Darker blue on hover */
}
  </style>
  
