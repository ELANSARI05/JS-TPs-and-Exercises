<template>
       <div class="details">
        <p style="font-size: 30px;"><b>Give the informations you want to update for this job : <span></span></b></p><br><br>
            <label><span><b>The title : <input v-model="updatedData.titre" type="text"></b></span><br><br><br></label>
            <label><span><b> The description : <input v-model="updatedData.description" type="text"></b></span><br><br><br></label>
            <label><span><b>The place : <input v-model= "updatedData.lieu" type="text"></b></span><br><br><br></label>
            <label><span><b>The salary : <input v-model="updatedData.salaire" type="number"></b></span><br><br><br></label>
            <label><span><b>The type : <input v-model="updatedData.type" type="text"></b></span><br><br><br></label>
       </div><br><br>
       <button class="redirect"@click="func()">Save</button>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'EDIT',
    props : ["jobs"],
    data() {
     return {
        updatedData :{ 
        titre : "",
        description : "",
        lieu : "",
        salaire : 0 ,
        type : ""
        },
        jobId: parseInt(this.$route.params.id)
    };
  },
    methods : {
        func(){
        if(this.updatedData.titre == "")
        alert(" You should fill the title");
        else if (this.updatedData.description == "")
        alert(" You should fill the description");
        else if (this.updatedData.lieu == "")
        alert(" You should fill the place");
        else if (this.updatedData.salaire == 0)
        alert(" You should fill the salary");
        else if (this.updatedData.type == "")
        alert(" You should fill the type");
        else {
            fetch('http://localhost:3000/emplois/' + this.jobId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.updatedData)
            })
            .then(() => this.$router.push({ name: 'Home'  }))
            .catch(error => console.log(error.message))
        }
        }
     }
  }
  </script>
  
  <style>
    .details{
        border: groove;
        border-color: rgb(238, 56, 56);
        border-width: 20px;
        width: 70%;
        margin-left: 15%
        
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
  