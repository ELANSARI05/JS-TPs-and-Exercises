<template>
  <div class="resume-page">
    <header class="header">
      <router-link to="/home"><img height="100%" :src="logo" alt="App Logo" class="header-logo"></router-link>
    </header>
    <div class="main-content" :class="{ 'mobile-view': isMobile }">
      <nav :class="['sidebar', { 'sidebar-hidden': !isSidebarVisible && isMobile }]">
        <ul>
          <li :class="{ active: selectedComponent === 'models' }" @click="toggleModelSidebar">
            <i class="fas fa-th-large"></i>
            Models
          </li>
        </ul>
      </nav>
      <section class="content" :class="{ 'full-width': isMobile && (!isSidebarVisible && !isRightSidebarVisible) }">
        <component :is="selectedComponent" :cvid="id"></component>
      </section>
      <aside :class="['right-sidebar', { 'right-sidebar-hidden': !isRightSidebarVisible && isMobile }]">
        <div class="right-sidebar-content">
          <h3>Suggestions</h3>
          <ul>
            <li>Keep your resume concise and focused.</li>
            <li>Highlight key achievements and skills.</li>
            <li>Customize your resume for each job application.</li>
          </ul>
        </div>
      </aside>
    </div>

    <div class="model-sidebar" :class="{ open: showModelSidebar }">
      <div class="model-header">
        <h3>Select a Template</h3>
        <button @click="toggleModelSidebar">Close</button>
      </div>
      <div class="model-content">
        <div v-for="model in models" :key="model.name" class="model-preview" @click="selectTemplate(model.name)">
          <img :src="require(`../assets/${model.image}.png`)" :alt="model.name" class="model-image">
          <p>{{ model.name }}</p>
        </div>
      </div>
    </div>
    <div class="overlay" v-if="showModelSidebar" @click="toggleModelSidebar"></div>
  </div>
</template>


<script>
import { projectFirestore } from '../firebase/config';
import logo from '../logo.png';
import cool_rtl from '../components/cool_rtl.vue';
import Creative from '@/components/creative.vue';
import side_bar from '@/components/side_bar.vue';

export default {
  name: 'Resume',
  components: {
    side_bar: side_bar,
    Creative: Creative,
    cool_rtl: cool_rtl
  },
  data() {
    return {
      person: [],
      id: this.$route.params.id,
      logo: logo,
      selectedComponent: this.$route.params.templateName,
      showModelSidebar: false,
      models: [
        { name: 'cool_rtl', image: 'resume-cool_rtl' },
        { name: 'creative', image: 'resume-creative' },
        { name: 'side_bar', image: 'resume-side_bar' }
      ],
      isSidebarVisible: true,
      isRightSidebarVisible: true,
      isMobile: window.innerWidth <= 768
    };
  },
  async mounted() {
    try {
      let res = await projectFirestore.collection('Person').get();
      this.person = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    '$route.params.templateName': function (newTemplateName) {
      this.selectedComponent = newTemplateName;
    }
  },
  methods: {
    toggleModelSidebar() {
      this.showModelSidebar = !this.showModelSidebar;
    },
    async selectTemplate(templateName) {
      try {
        await projectFirestore.collection('cv').doc(this.id).update({ templateName });
        this.$router.push({ name: 'Resume', params: { id: this.id, templateName } });
        this.showModelSidebar = false;
      } catch (err) {
        console.error('Error updating template name:', err);
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 1500;
      if (!this.isMobile) {
        this.isSidebarVisible = true;
        this.isRightSidebarVisible = true;
      } else {
        this.isSidebarVisible = false;
        this.isRightSidebarVisible = false;
      }
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
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  width: 100px;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
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
  position: relative;
  z-index: 1000;
}

.sidebar-hidden {
  display: none;
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

.content {
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
  backdrop-filter: blur(5px);
  overflow-y: auto;
}

.content.full-width {
  width: 100%;
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
  display: none;
}

.right-sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.model-sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: left 0.3s ease-in-out;
}

.model-sidebar.open {
  left: 0;
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgb(228, 131, 131);
  color: white;
}

.model-content {
  padding: 20px;
}

.model-preview {
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
}

.model-image {
  width: 40%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
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

