<template>
    <div class="home-container">
      <header>
      </header>
      <div class="main-content">
        <nav class="sidebar">
          <img :src="logo" alt="App Logo" class="app-logo">
          <ul>
            <li :class="{active :selectedComponent=== 'dashboard'}" @click="selectedComponent = 'dashboard'">
              <i class="fas fa-tachometer-alt"></i>
              Dashboard
            </li>
            <li :class="{active :selectedComponent=== 'myCvs'}" @click="selectedComponent = 'myCvs'">
              <i class="fas fa-file-alt"></i>
              My CVs
            </li>
            <li :class="{active :selectedComponent=== 'myAccount'}" @click="selectedComponent = 'myAccount'">
              <i class="fas fa-user"></i>
              My Account
            </li>
            <li :class="{active :selectedComponent=== 'help'}" @click="selectedComponent = 'help'">
              <i class="fas fa-question-circle"></i>
              Help
            </li>
            <li @click="logout">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </li>
          </ul>
          <footer>
            <p>&copy; 2024 ResumeGenius</p>
          </footer>
        </nav>
        <section class="content">
          <component :is="selectedComponent" :person = "person" :userId = "userId" :userName="userName"></component>
        </section>
        <aside class="right-sidebar">
          <div class="help-section">
            <h3>How can I fill my resume?</h3>
            <p>Learn how to create a compelling resume that stands out.</p>
            <a href="#" class="see-more">See more</a>
          </div>
        </aside>
      </div>
    </div>
  </template>
  
  <script>
  import { projectAuth, projectFirestore } from '../firebase/config';
  import logo from '../logo.png'; // Make sure to have a logo image in your assets folder
  import Dashboard from '../components/Dashboard.vue';
  import MyCvs from '../components/MyCvs.vue';
  import MyAccount from '../components/MyAccount.vue';
  import Help from '../components/Help.vue';
  export default {
    name: 'Home',
    components: {
      dashboard: Dashboard,
      myCvs: MyCvs,
      myAccount: MyAccount,
      help: Help,
    },
    data() {
      return {
        logo: logo,
        selectedComponent: 'dashboard',
        person : [],
        userName: "",
        userId : ""
      };
    },
    created() {
    projectAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.userName = user.displayName;
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userName', user.displayName);
      } else {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          this.userId = storedUserId;
          this.userName = localStorage.getItem('userName');
        } else {
          this.$router.push('/login');
        }
      }
      this.fetchperson();
    });
  },
    async mounted() {
    try {
      const discussionsRes = await projectFirestore.collection('Person').get();
      this.person = discussionsRes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      this.error = err.message;
    }
    },
    methods: {
      async fetchperson() {
        try {
          const res = await projectFirestore.collection('Person').get();
          this.person = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          this.extractCategories();
        } catch (err) {
          console.error(err.message);
        }
        console.log(this.person)
      }
    }
  };
  </script>
  
  <style>
  .home-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    
  }
  
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #2c3e50;
    color: white;
    height: 60px;
  }
  
  .app-logo {
    height: 70px;
    width: 70px;
  }
  
  .main-content {
    display: flex;
    flex: 1;
  }
  .active{
    text-decoration-line: underline;
    font-weight:bolder
  }
  .sidebar {
    width: 250px;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  
  .sidebar footer {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .content {
    
    flex: 1;
    padding: 20px;
    background-color: #ecf0f1;
    backdrop-filter: blur(5px);
  }
  
  .right-sidebar {
    width: 300px;
    background-color: white;
    padding: 20px;
    border-left: 1px solid #ccc;
  }
  
  .help-section {
    background-color: rgb(206, 206, 216);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .help-section h3 {
    margin-top: 0;
  }
  
  .help-section p {
    margin: 10px 0;
  }
  
  .see-more {
    color: #007bff;
    text-decoration: none;
  }
  
  .see-more:hover {
    text-decoration: underline;
  }
  </style>
  