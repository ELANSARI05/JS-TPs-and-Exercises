<template>
    <div class="profile">
      <h2>User Profile</h2>
      <div v-if="user">
        <p><strong>Name:</strong> {{ user.displayName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Photo:</strong></p>
        <img :src="user.photoURL" alt="User Photo">
      </div>
      <div v-else>
        <p>No user signed in.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
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
      }
    }
  };
  </script>
  
  <style scoped>
  .profile {
    margin: 20px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  img {
    max-width: 200px;
    max-height: 200px;
    margin-top: 10px;
  }
  </style>
  