<template>
  <div class="home">
    <div class="header">
      <div style="margin-left: 17px"><router-link to="/profile">
          <img :src="userAatar" alt="" width="40px">
          profile
        </router-link>
      </div>
      <div style="margin-left: 0%;">
        <h1>Welcome, {{ userName }}</h1>
        <!-- Add router link to navigate to profile -->
      </div><br>
    </div>
    <div class="container2">
      <div class="content">
        <div class="categories">
          <button class="btn btn-success mb-3" @click="goToNewDiscussion">Add New Discussion</button>
        </div>
        <div class="categories">
          <button class="btn btn-primary" @click="toggleCategories">
            {{ showCategories ? 'Hide Categories' : 'Show Categories' }}
          </button>
          
          <transition name="fade">
            <div v-if="showCategories" class="categories-list">
              <button
                class="btn btn-link btn-show-all"
                @click="filterDiscussions(null)"
              >
                Show All
              </button>
              <button
                v-for="category in categories"
                :key="category"
                class="btn btn-link"
                @click="filterDiscussions(category)"
              >
                {{ category }}
              </button>
            </div>
          </transition>
        </div>
        <div class="categories">
          <button class="btn btn-success mb-3" @click="filterYourDiscussions()">Your discussions</button>
        </div>
      </div>
      <div class="discussions">
        <DiscussionList :discussions :userId="userId" :selectedCategory="selectedCategory" />
      </div>
    </div>
  </div>
</template>




<script>
import pic from '../pic.webp';
import { projectAuth, projectFirestore } from '../firebase/config';
import DiscussionList from '../components/DiscussionList.vue';

export default {
  name: 'Home',
  components: { DiscussionList },
  data() {
    return {
      userId: null,
      userEmail: null,
      discussions: [],
      categories: [],
      selectedCategory: null,
      showCategories: false,
      image : pic,
      userName : "",
      userAatar : ""
    };
  },
  created() {
    projectAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.userEmail = user.email;
        this.userName = user.displayName; // Assuming you have user's display name
        this.userAatar = user.photoURL; // Assuming you have user's avatar URL
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email);
      } else {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          this.userId = storedUserId;
          this.userEmail = localStorage.getItem('userEmail'); // Optional, if you store it
        } else {
          this.$router.push('/login');
        }
      }
  
      // Fetch discussions and extract categories
      this.fetchDiscussions();
    });
  },
  methods: {
    async fetchDiscussions() {
      try {
        const res = await projectFirestore.collection('Discussions').get();
        this.discussions = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.extractCategories();
      } catch (err) {
        console.error(err.message);
      }
    },
    extractCategories() {
      const categoriesSet = new Set();
      this.discussions.forEach(discussion => {
        if (discussion.category) {
          categoriesSet.add(discussion.category);
        }
      });
      this.categories = Array.from(categoriesSet);
    },
    filterDiscussions(category) {
      this.selectedCategory = category;
    },
    filterYourDiscussions() {
      this.selectedCategory = null; // Reset selected category
      this.discussions = this.discussions.filter(discussion => discussion.createdBy == this.userId);
    },
    toggleCategories() {
      this.showCategories = !this.showCategories;
    },
    goToNewDiscussion() {
      this.$router.push('/new-discussion');
    },
    async signOut() {
      try {
        await projectAuth.signOut();
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        this.$router.push('/');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  }
};
</script>




<style scoped>
.container2 {
  display: flex;
}

.home {
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header div {
  display: flex;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.header img {
  margin-left: 10px;
}

.header .btn {
  margin-left: 20px;
}

.content {
  display: flex;
  flex-direction: column;
}

.categories {
  padding: 20px;
  border-right: 1px solid #ccc;
}

.categories .btn {
  display: block;
  margin-bottom: 10px;
  text-align: left;
}

.categories-list {
  margin-top: 10px;
}

.btn-show-all {
  color: #007bff;
  font-weight: bold;
}

.btn-show-all:hover {
  color: #0056b3;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.discussions {
  padding: 20px;
  flex: 1;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}
</style>
