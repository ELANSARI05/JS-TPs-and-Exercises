<template>
    <div class="profile">
      <div style="margin-left: 35%;text-decoration:solid" class="header">
        <h1>User Profile</h1>
      </div>
      <div class="user-info">
        <div class="avatar">
          <a :href="userAatar"><img :src="userAatar" alt="User Avatar" width="120px"></a>
        </div>
        <div class="details">
          <p><strong>Email:</strong> {{ userEmail }}</p>
          <p><strong>Name:</strong> {{ userName }}</p>
          <p><strong>Joined:</strong> {{ joinedDate }}</p>
          <!-- Add more user details as needed -->
        </div>
      </div>
    </div>
    <button  style="width: 10%;height: 45px;font-size: 15px;margin-left: 40%" class="btn btn-primary btn-sm" @click="goHome">Back to home</button><br><br>
    <button style="width: 10%;margin-left: 40%" class="btn btn-danger btn-sm" @click="signOut">Sign Out</button>
  </template>
  
  <script>
  import { projectAuth } from '../firebase/config';
  
  export default {
    name: 'Profile',
    data() {
      return {
        userEmail: '',
        userName: '',
        joinedDate: '',
        userAatar: ''
      };
    },
    async created() {
      projectAuth.onAuthStateChanged(user => {
        if (user) {
          this.userEmail = user.email;
          this.userName = user.displayName; // Assuming you have user's display name
          this.joinedDate = new Date(user.metadata.creationTime).toLocaleDateString(); // Get user's join date
          this.userAatar = user.photoURL; // Assuming you have user's avatar URL
          localStorage.setItem('userId', user.uid);
          localStorage.setItem('userName', user.displayName);
          localStorage.setItem('joinedDate', new Date(user.metadata.creationTime).toLocaleDateString());
          localStorage.setItem('userEmail', user.email);
          localStorage.setItem('userAatar', user.photoURL);
        } else {
          const storedUserId = localStorage.getItem('userId');
          if (storedUserId) {
            this.userId = storedUserId;
            this.userEmail = localStorage.getItem('userEmail'); // Optional, if you store it
          } else {
            this.$router.push('/login');
          }
        }
    
      });
    },
    methods: {
      async signOut() {
        try {
          await projectAuth.signOut();
          this.$router.push('/');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      },
      goHome() {
      this.$router.push('/home');
    }
    }
  };
  </script>
  
  <style scoped>
  .profile {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .header h1 {
    font-size: 32px;
    color: #333;
    margin: 0;
  }
  
  .avatar img {
    border-radius: 50%;
    border: 4px solid #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    margin-right: 40px;
  }
  
  .details {
    text-align: left;
  }
  
  .details p {
    margin: 10px 0;
    font-size: 18px;
  }
  
  .details p:first-child {
    margin-top: 20px;
  }
  
  .btn-danger {
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
  }
  
  .btn-danger:focus {
    outline: none;
  }
  
  .btn-danger:active {
    transform: translateY(1px);
  }
  </style>
  
