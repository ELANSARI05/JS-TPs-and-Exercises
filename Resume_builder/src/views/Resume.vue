<template>
    <div class="resume-page">
      <header class="header">
        <img height="100%" :src="logo" alt="App Logo" class="header-logo">
      </header>
      <div class="main-content">
        <nav class="sidebar">
          <ul>
            <li :class="{ active: selectedComponent === 'models' }" @click="selectedComponent = 'models'">
              <i class="fas fa-th-large"></i>
              Models
            </li>
            <li :class="{ active: selectedComponent === 'layout' }" @click="selectedComponent = 'layout'">
              <i class="fas fa-columns"></i>
              Layout
            </li>
            <li :class="{ active: selectedComponent === 'infos' }" @click="selectedComponent = 'infos'">
              <i class="fas fa-info-circle"></i>
              Infos
            </li>
            <li :class="{ active: selectedComponent === 'profile' }" @click="selectedComponent = 'profile'">
              <i class="fas fa-user"></i>
              Profile
            </li>
            <li :class="{ active: selectedComponent === 'addBlock' }" @click="selectedComponent = 'addBlock'">
              <i class="fas fa-plus-square"></i>
              Add Block
            </li>
          </ul>
        </nav>
        <section class="content">
          <div v-for="per in person" :key="per.id" class="cv-wrapper">
            <div class="cv" v-if="per.id == id">
              <creative :person="per"></creative>
            </div>
          </div>
        </section>
        <aside class="right-sidebar">
          <h3>Suggestions</h3>
          <ul>
            <li>Keep your resume concise and focused.</li>
            <li>Highlight key achievements and skills.</li>
            <li>Customize your resume for each job application.</li>
          </ul>
        </aside>
      </div>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '../firebase/config';
  import creative from '../components/creative.vue';
  import logo from '../logo.png'; // Make sure to have a logo image in your assets folder
  
  export default {
    name: 'Resume',
    components: {
      creative
    },
    data() {
      return {
        person: [],
        id: this.$route.params.id,
        logo: logo,
        selectedComponent: 'models',
      };
    },
    async mounted() {
      try {
        let res = await projectFirestore.collection('Person').get();
        this.person = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
  };
  </script>
  
  <style scoped>
  .resume-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    color: #333;
  }
  
  .header {
    background-color: rgb(228, 131, 131);
    text-align: center;
    padding: 10px;
    height: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header-logo {
    width: 100px;
  }
  
  .main-content {
    display: flex;
    flex: 1;
  }
  
  .sidebar {
    width: 250px;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    border-right: 1px solid #ccc;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    padding: 10px 0;
    cursor: pointer;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
  }
  
  .sidebar ul li:hover {
    background-color: #f0f0f0;
  }
  
  .sidebar ul li i {
    margin-right: 10px;
  }
  
  .sidebar .active {
    text-decoration-line: underline;
    font-weight: bolder;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    background-color: rgb(241, 195, 109); /* Transparent effect */
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
  }
  
  .right-sidebar {
    width: 300px;
    background-color: white;
    padding: 20px;
    border-left: 1px solid #ccc;
  }
  
  .right-sidebar h3 {
    margin-bottom: 10px;
  }
  
  .right-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .right-sidebar li {
    margin-bottom: 10px;
  }
  
  .cv-wrapper {
    margin-bottom: 20px;
  }
  
  .cv {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
  }
  </style>
  