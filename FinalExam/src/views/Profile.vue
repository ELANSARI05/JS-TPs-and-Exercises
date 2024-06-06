<template>
    <div class="profile">
      <h2>User Profile</h2>
      <div v-if="user" class="user-details">
        <p><strong>Name:</strong> {{ user.displayName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <div class="photo-container">
          <p><strong>Photo:</strong></p>
          <img :src="user.photoURL" alt="User Photo" class="profile-photo">
        </div>
        <button class="sign-out-button" @click="signOut">Sign Out</button>
      </div>
      <div v-else>
        <p>No user signed in.</p>
      </div>
      <router-link to="/home">
        <button class="home-button">Back to Home</button>
      </router-link>
    </div>
  </template>
  
  
  <script>
import { projectAuth } from '@/firebase/config';

export default {
  data() {
    return {
      user: null
    };
  },
  async created() {
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const currentUser = projectAuth.currentUser;
        if (currentUser) {
          // User is signed in, fetch user profile information
          this.user = currentUser;
        } else {
          // No user signed in
          this.user = null;
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async signOut() {
      try {
        await projectAuth.signOut();
        this.user = null;
        this.$router.push("/login");
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  }
};
</script>

<style scoped>
.profile {
  margin: 20px;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.user-details {
  text-align: left;
  width: 100%;
  max-width: 600px;
}

.user-details p {
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
}

.photo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.profile-photo {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sign-out-button {
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.sign-out-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.home-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.home-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>
