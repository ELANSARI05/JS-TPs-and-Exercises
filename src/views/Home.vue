<template>
  <div class="home">
    <div class="header">
      <div style="margin-left: 17px">
        <router-link style="text-decoration: none; font-size: 20px; color: blue;" to="/profile">
          <img :src="userAatar" alt="" width="40px">
          Your Profile
        </router-link>
      </div>
      <div style="margin-left: 0%;">
        <h1>Welcome, {{ userName }}</h1>
      </div><br>
    </div>
    <div class="container2">
      <div class="content">
        <div class="categories">
          <button class="btn btn-success mb-3" @click="goToNewDiscussion">Start discussion</button>
        </div>
        <div class="categories">
          <button class="btn btn-primary" @click="toggleCategories">
            {{ showCategories ? 'Hide Categories' : 'Show Categories' }}
          </button>
          <transition name="fade">
            <div v-if="showCategories" class="categories-list">
              <button class="btn btn-link btn-show-all" @click="filterDiscussions(null)">
                Show All
              </button>
              <button v-for="category in categories" :key="category" class="btn btn-link" @click="filterDiscussions(category)">
                {{ category }}
              </button>
            </div>
          </transition>
        </div>
        <div class="categories">
          <button class="btn btn-dark mb-3" @click="toggleYourDiscussions">
            {{ yourdisc ? 'Show All Discussions' : 'Show Your Discussions' }}
          </button>
        </div>
        <div class="categories notification-wrapper">
          <button class="btn btn-warning mb-3" @click="showNotifications">
            Notifications
          </button>
          <span class="notification-count">{{ notifcalc() }}</span>
        </div>
      </div>
      <div class="discussions">
        <component :is="currentComponent" :userId="userId" :selectedCategory="selectedCategory" :yourdisc="yourdisc" @hide-notifications="hideNotifications" />
      </div>
    </div>
  </div>
</template>

<script>
import pic from '../pic.webp';
import { projectAuth, projectFirestore } from '../firebase/config';
import DiscussionList from '../components/DiscussionList.vue';
import Notification from '../components/Notification.vue';

export default {
  name: 'Home',
  components: { DiscussionList, Notification },
  data() {
    return {
      userId: null,
      userEmail: null,
      discussions: [],
      categories: [],
      selectedCategory: null,
      showCategories: false,
      image: pic,
      userName: "",
      userAatar: "",
      yourdisc: false,
      showingNotifications: false,
      replies: []
    };
  },
  async mounted() {
    try {
      const discussionsRes = await projectFirestore.collection('Discussions').get();
      this.discussions = discussionsRes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      this.error = err.message;
    }
    try {
      const repliesRes = await projectFirestore.collection('responses').get();
      this.replies = repliesRes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      this.error = err.message;
    }
  },
  computed: {
    currentComponent() {
      return this.showingNotifications ? 'Notification' : 'DiscussionList';
    }
  },
  created() {
    projectAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.userEmail = user.email;
        this.userName = user.displayName;
        this.userAatar = user.photoURL;
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email);
      } else {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          this.userId = storedUserId;
          this.userEmail = localStorage.getItem('userEmail');
        } else {
          this.$router.push('/login');
        }
      }

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
    toggleCategories() {
      this.showCategories = !this.showCategories;
      this.showingNotifications = false;

    },
    toggleYourDiscussions() {
      this.yourdisc = !this.yourdisc;
      if (this.yourdisc) {
        this.filterYourDiscussions();
      } else {
        this.selectedCategory = null;
        this.fetchDiscussions();
      }
      this.showingNotifications = false;

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
    },
    filterYourDiscussions() {
      this.selectedCategory = null;
      this.discussions = this.discussions.filter(discussion => discussion.createdBy === this.userId);
    },
    showNotifications() {
      this.showingNotifications = true;
    },
    hideNotifications() {
      this.showingNotifications = false;
    },
    notifcalc() {
      let a = 0;
      for (let i = 0; i < this.discussions.length; i++) {
        const disc = this.discussions[i];
        if (disc.replies.length !== 0) {
          const id1 = disc.replies[disc.replies.length - 1];
          for (let j = 0; j < this.replies.length; j++) {
            if (this.replies[j].id === id1) {
              if (this.replies[j].auteur !== this.userId) {
                a++;
                break;
              }
            }
          }
        }
      }
      return a;
    }
  }
};
</script>

<style scoped>
.container2 {
  display: flex;
}
img {
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.notification-wrapper {
  position: relative;
}

.notification-count {
  position: absolute;
  top: -0px;
  margin-left: 60px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 12px;
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
