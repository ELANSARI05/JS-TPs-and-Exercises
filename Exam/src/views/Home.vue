<template>
  <div class="home-container">
    <div class="header" v-if="isMobile">
      <i class="fas fa-bars sidebar-toggle" @click="toggleSidebar"></i>
      <img :src="logo" alt="App Logo" class="app-logo">
      <i class="fas fa-bell bell-icon" @click="toggleRightSidebar"></i>
    </div>
    <div class="main-content" :class="{ 'mobile-view': isMobile }">
      <nav :class="['sidebar', { 'sidebar-hidden': !isSidebarVisible && isMobile }]">
        <div></div><br><br><br>
        <ul>
          <li :class="{active :selectedComponent=== 'dashboard'}" @click="selectComponent('dashboard')">
            <i class="fas fa-tachometer-alt dashboard-icon"></i>
            <span>Dashboard</span>
          </li>
          <li :class="{active :selectedComponent=== 'myResumes'}" @click="selectComponent('myResumes')">
            <i class="fas fa-file-alt resumes-icon"></i>
            <span>My Resumes</span>
          </li>
          <li :class="{active :selectedComponent=== 'myAccount'}" @click="selectComponent('myAccount')">
            <i class="fas fa-user account-icon"></i>
            <span>My Account</span>
          </li>
          <li @click="logout">
            <i class="fas fa-sign-out-alt logout-icon"></i>
            <span>Logout</span>
          </li>
        </ul>
        <footer>
          <p>&copy; 2024 ResumeGenius</p>
        </footer>
      </nav>
      <section class="content" :class="{ 'full-width': isMobile && (!isSidebarVisible && !isRightSidebarVisible) }">
        <div v-for="per in person">
          <component v-if="per.id == userId" :is="selectedComponent" :person="per" :userId="userId" :userName="userName"></component>
        </div>
      </section>
      <aside :class="['right-sidebar', { 'right-sidebar-hidden': !isRightSidebarVisible && isMobile }]">
        <div class="right-sidebar-content">
          <div class="help-section">
            <h3>The Importance of a Resume</h3>
            <p>A well-crafted resume can make a huge difference in your job search. Learn why it's crucial and how to make yours stand out.</p>
            <a href="https://www.indeed.com/career-advice/resumes-cover-letters/why-is-a-resume-important#:~:text=Why%20is%20a%20resume%20important%3F%201%201.%20Outlines,5%205.%20Can%20lead%20to%20an%20interview%20" class="see-more">See more</a>
          </div>
          <div class="video-section">
            <h3>How to Create Your Resume</h3>
            <div class="video-container">
              <a href="https://www.youtube.com/watch?v=u75hUSShvnc" target="_blank">
                <img src="https://img.youtube.com/vi/u75hUSShvnc/0.jpg" alt="How to Create Your Resume" class="video-preview">
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { projectAuth, projectFirestore } from '../firebase/config';
import logo from '../assets/logo1.png'; // Ensure you have the new logo image in your assets folder
import Dashboard from '../components/Dashboard.vue';
import MyResumes from '../components/MyResumes.vue';
import MyAccount from '../components/MyAccount.vue';
import Help from '../components/Help.vue';

export default {
  name: 'Home',
  components: {
    dashboard: Dashboard,
    myResumes: MyResumes,
    myAccount: MyAccount,
    help: Help,
  },
  data() {
    return {
      logo: logo,
      selectedComponent: 'dashboard',
      person: [],
      userName: "",
      userId: "",
      isSidebarVisible: true, // Visible by default
      isRightSidebarVisible: true, // Visible by default
      isMobile: window.innerWidth <= 768
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

    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
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
      } catch (err) {
        console.error(err.message);
      }
      console.log(this.person);
    },
    logout() {
      projectAuth.signOut().then(() => {
        this.$router.push('/login');
      });
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      this.isRightSidebarVisible = false; // Hide right sidebar when left sidebar is shown
    },
    toggleRightSidebar() {
      this.isRightSidebarVisible = !this.isRightSidebarVisible;
      this.isSidebarVisible = false; // Hide left sidebar when right sidebar is shown
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.isSidebarVisible = true;
        this.isRightSidebarVisible = true;
      } else {
        this.isSidebarVisible = false;
        this.isRightSidebarVisible = false;
      }
    },
    selectComponent(component) {
      this.selectedComponent = component;
      if (this.isMobile) {
        this.isSidebarVisible = false;
        this.isRightSidebarVisible = false;
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #2c3e50;
  color: white;
  height: 60px;
}

.sidebar-toggle,
.bell-icon {
  font-size: 24px;
  cursor: pointer;
  color: inherit; /* Keep original icon colors */
}

.app-logo {
  height: 50px;
  width: auto;
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
  justify-content: flex-start; /* Align options to the top */
  padding: 20px;
  border-right: 1px solid #ccc;
  position: relative;
  z-index: 1000;
}

.sidebar-hidden {
  display: none; /* Hide sidebar */
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 15px 0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.sidebar ul li span {
  flex: 1;
  text-align: left;
}

.sidebar ul li:hover {
  background-color: #f0f0f0;
}

.sidebar ul li i {
  margin-right: 10px;
}

.active {
  background-color: #87CEFA;
  font-weight: bold;
  border-radius: 10px;
  transform: translateX(10px);
}

/* Icon colors */
.dashboard-icon {
  color: #FF6347; /* Tomato */
}

.resumes-icon {
  color: #4682B4; /* SteelBlue */
}

.account-icon {
  color: #32CD32; /* LimeGreen */
}

.help-icon {
  color: #FFD700; /* Gold */
}

.logout-icon {
  color: #DC143C; /* Crimson */
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
  backdrop-filter: blur(5px);
  font-family: Arial, sans-serif;
  overflow-y: auto;
}

.content.full-width {
  width: 100%; /* Make content full-width on mobile */
}

.right-sidebar {
  width: 300px;
  background-color: white;
  padding: 20px;
  border-left: 1px solid #ccc;
  position: relative;
  z-index: 1000;
}

.right-sidebar-hidden {
  display: none; /* Hide right sidebar */
}

.right-sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.help-section {
  background-color: rgb(255, 236, 179);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
}

.help-section h3 {
  margin-top: 0;
  font-size: 24px;
}

.help-section p {
  margin: 10px 0;
  font-size: 18px;
}

.see-more {
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
}

.see-more:hover {
  text-decoration: underline;
}

.video-section {
  background-color: rgb(206, 206, 216);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

.video-section h3 {
  margin-top: 0;
  font-size: 24px;
}

.video-container {
  margin-top: 10px;
}

.video-preview {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .main-content.mobile-view {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: fixed;
    transform: translateX(0);
  }

  .right-sidebar {
    width: 100%;
    height: auto;
    position: fixed;
    transform: translateX(0);
  }

  .content {
    padding: 10px;
    margin-top: 60px;
    flex: 1;
    width: 100%;
  }
}
</style>
