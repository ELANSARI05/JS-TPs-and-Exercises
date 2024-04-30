<template>
    <th @click="show_details(job)"><b>{{job.id}}</b></th>
    <th @click="show_details(job)"><b>{{job.titre}}</b></th>
    <td @click="show_details(job)">{{job.description}}</td>
    <th><button class="button_det" @click="job_edit(job)">Edit</button></th>
    <th><button class="button_det" @click="job_delete(job)">Delete</button></th>
</template>
  
<script>
export default {
  name: 'SHOW',
  data(){
    return {
    jobs: []
    }},
  methods: {
    show_details(job) {
        this.$router.push({ name: 'JOB_DETAIL', params: { id: job.id } }); 
    },
    job_edit(job) {
        this.$router.push({ name: 'EDIT', params: { id: job.id } });
    },
    job_delete(job) {
            fetch('http://localhost:3000/emplois/' + job.id, {
                method: 'DELETE'
            })
            .then(() => this.jobs = this.jobs.filter(job1 => job1.id !== job.id))
            .catch(error => console.log(error.message))

        }
  },
  mounted(){
        fetch('http://localhost:3000/emplois')
        .then(response => response.json())
        .then(data => this.jobs = data)
        .catch(error => console.log(error.message))
    },
  props: ["job"],
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

/* Hover effect */
.button_det :hover {
  background-color: #2980b9; /* Darker blue on hover */
}
  </style>
  