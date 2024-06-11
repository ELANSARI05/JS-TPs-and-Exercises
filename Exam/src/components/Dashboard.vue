<template>
  <div class="dashboard-container">
    <div class="welcome-message" v-if="userName">
      <h2>Welcome to Resume Builder, <span class="user-name">{{ userName }}</span> 🎉</h2><br>
      <p class="instruction">Choose a template and create a resume in one click ✨</p>
    </div>
    <div class="templates-grid">
      <div v-for="template in templates" :key="template.name" class="template-item" @click="selectTemplate(template)">
        <img :src="require(`@/assets/${template.image}.png`)" :alt="template.name" class="template-image" />
        <p class="template-name"><b>{{ template.name }}</b></p>
      </div>
    </div>
    <div v-if="showForm" class="overlay" @click="closeForm"></div>
    <div v-if="showForm" class="cvblock">
      <div @click="closeForm" class="close-button">X</div>
      <label for="resume-name"><b>Give a name for the resume</b></label><br>
      <input required type="text" v-model="resumeName" id="resume-name" class="cvblock-input" placeholder="Example: Job Search, Internship, Targeted Company"><br>
      <label for="resume-purpose"><b>Specify the position sought, or the activity sector</b></label><br>
      <input required type="text" v-model="resumePurpose" id="resume-purpose" class="cvblock-input" placeholder="Examples: Agricultural Technician, Product Manager"><br><br>
      <button @click="createResume" class="cvblock-button">Create the document</button>
    </div>
  </div>
</template>

<script>
import { projectFirestore, projectAuth } from '../firebase/config';
import firebase from 'firebase/app';

export default {
  name: 'Dashboard',
  props : ['person'],
  data() {
    return {
      templates: [
        { name: 'cool_rtl', image: 'resume-cool_rtl' },
        { name: 'creative', image: 'resume-creative' },
        { name: 'side_bar', image: 'resume-side_bar' }
      ],
      userName: '',
      userId: '',
      showForm: false,
      selectedTemplate: null,
      resumeName: '',
      resumePurpose: '',
    };
  },
  created() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      this.fetchUserInfo();
    }
    console.log(this.userId);
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const user = projectAuth.currentUser;
        if (user) {
          const userId = user.uid;
          const userDoc = await projectFirestore.collection('Person').doc(userId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            this.userId = userId;
            this.userName = userData.name;
            localStorage.setItem('userId', userId);
          } else {
            console.error('User document does not exist.');
          }
        } else {
          console.error('No authenticated user found.');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    selectTemplate(template) {
      this.selectedTemplate = template;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.selectedTemplate = null;
    },
    async createResume() {
    if (!this.resumeName || !this.resumePurpose || !this.person) {
      alert('Please fill in all fields.');
      return;
    }

    const { name, gender, position, birthdate, birthlocation, email, street, city, tel, status, languages, skills, education, experiences, hobbies, projects } = this.person;

    const newResume = {
      name: this.resumeName,
      gender: gender,
      templateName: this.selectedTemplate.name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId: this.userId,
      about: `Hi, my name is ${name}. I'm just about the most boring type of person you could possibly imagine. I like collecting leaves from the tree in my back yard and documenting each time I eat a peanut that is non-uniform. I am not a robot. Please hire me.`,
      position: position || 'Software Developer',
      birth: {
        year: birthdate || '1990',
        location: birthlocation || 'Unknown',
      },
      experience: experiences.length > 0 ? experiences.map(exp => ({
        timePeriod: "January 2020 - December 2020",
        company: "Default Company",
        position: exp,
        location: "Default Location",
        details: "Worked on various projects using default technologies and methodologies."
      })) : [
        {
          timePeriod: "January 2015 - December 2015",
          company: "Company B",
          position: "Frontend Developer",
          location: "New York, USA",
          details: "Fulfillment of extremely important tasks.",
        },
        {
          timePeriod: "March 2014 - December 2014",
          company: "Company C",
          position: "Trainee",
          location: "Los Angeles, USA",
          details: "Making coffee and baking cookies.",
        }
      ],
      education: education.length > 0 ? education.map(edu => ({
        timePeriod: "March 2012 - December 2013",
        degree: edu,
        institution: "Default University",
        location: "Default Location",
        details: "Studied various subjects related to the field of study."
      })) : [
        {
          timePeriod: "March 2012 - December 2013",
          degree: "Master of Arts",
          institution: "University A",
          location: "New York, USA",
          details: "Major in Hacking and Computer Penetration.",
        },
        {
          timePeriod: "March 2009 - December 2011",
          degree: "Bachelor of Science",
          institution: "University B",
          location: "Los Angeles, USA",
          details: "Major in Engineering.",
        }
      ],
      skills: skills.length > 0 ? skills.map(skill => ({ name: skill, level: 50, details: "Skilled in this technology." })) : [
        { name: "HTML5", level: 99, details: "Expert in HTML5." },
        { name: "CSS3", level: 95, details: "Proficient in CSS3." },
        { name: "JavaScript", level: 97, details: "Advanced knowledge in JavaScript." },
        { name: "Node.js", level: 93, details: "Experienced in Node.js." },
        { name: "Angular 2", level: 60, details: "Intermediate skills in Angular 2." },
        { name: "TypeScript", level: 80, details: "Proficient in TypeScript." },
        { name: "ES.Next", level: 70, details: "Knowledgeable in ES.Next." },
        { name: "Docker", level: 99, details: "Expert in Docker." }
      ],
      projects: projects.length > 0 ? projects.map(project => ({
        name: project,
        platform: "Vue.js",
        timePeriod: "February 2021",
        description: "Developed a project using Vue.js and other modern web technologies.",
        url: "https://github.com/default-project"
      })) : [
        {
          name: "best-resume-ever",
          platform: "Vue.js",
          timePeriod: "February 2016",
          description: "Build fast and easy multiple beautiful resumes and create your best CV ever! Made with Vue and LESS.",
          url: "https://github.com/salomonelli/best-resume-ever",
        }
      ],
      hobbies: hobbies.length > 0 ? hobbies : [
        { name: "Video Games", details: "Enjoy playing various video games." },
        { name: "Drawing", details: "Passionate about drawing and sketching." }
      ],
      contact: {
        name : this.userName,
        position : this.person.position,
        email: email || 'example@example.com',
        street: street || '123 Main St',
        phone: tel || '123-456-7890',
        birthDate: birthdate || '1990-01-01',
        drivingLicense: "Yes",
        city: city || 'Anytown',
        tel: tel || '123-456-7890',
      },
      status: status || 'Single',
      languages: languages.length > 0 ? languages.map(lang => ({ name: lang, level: "Intermediate", details: "Fluent in this language." })) : [
        { name: "English", level: "Advanced", details: "Fluent in English." },
        { name: "French", level: "Intermediate", details: "Conversational in French." }
      ],
    };

    try {
      const resumeRef = await projectFirestore.collection('cv').add(newResume);
      const cvid = resumeRef.id;
      await projectFirestore.collection('Person').doc(this.userId).set({
        resumes: firebase.firestore.FieldValue.arrayUnion(cvid)
      }, { merge: true });

      this.showForm = false;
      this.$router.push({ name: 'Resume', params: { id: cvid, templateName: this.selectedTemplate.name } });
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  }


  }
};
</script>

<style>
.dashboard-container {
  padding: 20px;
  text-align: center;
}

.welcome-message .user-name {
  font-family: 'Pacifico', cursive;
  font-size: 1.5em;
  color: rgb(192, 152, 238);
}

.instruction {
  font-family: 'Lobster', cursive;
  font-size: 1.5em;
  color: #20B2AA;
  margin-top: 10px;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.template-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  max-width: 100%;
}

.template-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.template-image {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

.template-name {
  font-size: 1.5em;
  color: #072647;
  font-family: "cursive";
  padding: 10px;
  background-color: #f9f9f9;
  width: 100%;
  text-align: center;
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

@media (max-width: 768px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
}
</style>
