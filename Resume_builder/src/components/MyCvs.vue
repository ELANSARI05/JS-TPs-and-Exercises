<template>
    <div>
      <div class="cv_cont">
        <div class="cv">
          <h2 class="cv-title"><b>My Resumes</b></h2>
        </div>
        <div class="search-container">
          <input type="text" placeholder="Search from the resumes.." class="search-input">
        </div>
      </div><br><br>
      <div class="create-resume-button-container">
        <button @click="showcv = true" class="create-resume-button">Create a resume</button>
      </div><br>
      <div v-for="per in person" :key="per.id">
        <div v-if="per.id == userId">
          <div v-for="cv_id in per.cv" :key="cv_id">
            <resume_preview :id="cv_id" :person="per" @update="fetchData"></resume_preview>
          </div>
        </div>
      </div>
      <div v-show="showcv" class="overlay" @click="showcv = false"></div>
      <div class="cvblock" v-show="showcv">
        <div @click="showcv = false" class="close-button">X</div>
        <label for="resume-name"><b>Give a name for the resume</b></label><br>
        <input required type="text" v-model="name" id="resume-name" class="cvblock-input"><br>
        <label for="resume-purpose"><b>Precise the purpose of the resume</b></label><br>
        <input required type="text" v-model="purpose" id="resume-purpose" class="cvblock-input"><br><br>
        <button @click="add_resume" class="cvblock-button">Create the document</button>
      </div>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '../firebase/config';
  import firebase from 'firebase/app';
  import resume_preview from '../components/resume_preview';
  
  export default {
    name: 'MyCvs',
    data() {
      return {
        user: null,
        showcv: false,
        name: "",
        purpose: ""
      };
    },
    components: { resume_preview },
    props: ['person', 'userId'],
    methods: {
      async add_resume() {
        try {
          // Create new CV
          const cvRef = await projectFirestore.collection('cv').add({
            Name: this.name,
            Purpose: this.purpose
          });
          
          // Get the new CV ID
          const newCvId = cvRef.id;
          
          // Update the Person document with the new CV ID
          await projectFirestore.collection('Person').doc(this.userId).update({
            cv: firebase.firestore.FieldValue.arrayUnion(newCvId)
          });
          
          // Update the local person data
          
          
          // Reset form and hide the cvblock
          this.name = '';
          this.purpose = '';
          this.showcv = false;
          
          this.$emit('update');
          
        } catch (err) {
          console.error('Error adding CV:', err);
        }
      },
      async fetchData() {
        // Fetch the latest data for the person
        const personDoc = await projectFirestore.collection('Person').doc(this.userId).get();
        if (personDoc.exists) {
          const personData = personDoc.data();
        }
      }
    },
    mounted() {
      this.fetchData();
    }
  };
  </script>
  
  <style>
  .cv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
  }
  
  .cv-title {
    color: orange;
  }
  
  .cv_cont {
    display: flex;
  }
  
  .search-container {
    margin-left: 10%;
  }
  
  .search-input {
    padding: 10px;
    border-radius: 10px;
    width: 150%;
  }
  
  .create-resume-button-container {
    margin-left: 40%;
  }
  
  .create-resume-button {
    width: 40%;
    border-radius: 10px;
    padding: 10px;
  }
  
  .cvblock {
    position: fixed;
    top: 30%; 
    left: 50%;
    transform: translate(-50%, -30%);
    width: 300px;
    border: 3px solid #73AD21;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1001;
  }
  
  .cvblock-input {
    width: 100%;
    border-radius: 10px;
    border: 1px solid blue;
    height: 45px;
    margin-bottom: 10px;
    padding: 5px;
  }
  
  .cvblock-button {
    width: 100%;
    border-radius: 10px;
    background-color: red;
    color: white;
    padding: 10px;
    cursor: pointer;
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }
  
  .close-button {
    cursor: pointer;
    font-size: 1.5em;
    text-align: right;
  }
  </style>
  