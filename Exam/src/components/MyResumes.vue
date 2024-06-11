<template>
  <div>
    <div class="cv_cont">
      <div class="cv">
        <h2 class="cv-title"><b>My Resumes</b></h2>
      </div>
      <div class="search-container">
        <input type="text" placeholder="Search from the resumes.." class="search-input">
      </div>
    </div><br>
    <div  v-for="cv_id in person.resumes" :key="cv_id">
          <resume_preview :id="cv_id" :person="person" @update="fetchData"></resume_preview>
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
  name: 'MyResumes',
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
          Resumes: firebase.firestore.FieldValue.arrayUnion(newCvId)
        });
        
        // Update the local person data
        
        
        // Reset form and hide the cvblock
        this.name = '';
        this.purpose = '';
        this.showcv = false;
        this.$router.push({ name: 'Resume', params: { id: this.userId, cvid: newCvId } });          
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
body {
  font-family: 'Roboto', sans-serif;
}

.cv {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
}

.cv-title {
  color: #FF4500;
  font-family: 'Montserrat', sans-serif;
}

.cv_cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  width: 50%;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
}

.create-resume-button-container {
  display: none; /* Removed as per instructions */
}

.cvblock {
  position: fixed;
  top: 30%; 
  left: 50%;
  transform: translate(-50%, -30%);
  width: 400px;
  border: 3px solid #4CAF50;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  font-family: 'Roboto', sans-serif;
}

.cvblock-input {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ccc;
  height: 45px;
  margin-bottom: 10px;
  padding: 5px;
  font-family: 'Roboto', sans-serif;
}

.cvblock-button {
  width: 100%;
  border-radius: 10px;
  background-color: #FF4500;
  color: white;
  padding: 12px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
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
  color: #FF4500;
}

.resume-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.resume-preview .icons {
  display: flex;
  gap: 10px;
}

.resume-preview .icon {
  font-size: 18px;
  color: #FF4500;
  cursor: pointer;
}

.resume-preview .icon:hover {
  color: #4CAF50;
}
</style>
