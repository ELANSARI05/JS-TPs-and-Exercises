<template>
    <div class="profile">
      <h2>User Profile</h2>
      <div v-if="user" class="user-details">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <div class="photo-container">
          <p><strong>Photo:</strong></p>
          <img v-if="user.photoURL || photoPreview" :src="photoPreview || user.photoURL" alt="User Photo" class="profile-photo">
          <input v-else type="file" @change="previewPhoto" />
          <input v-if="photoPreview" type="file" @change="uploadPhoto" />
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
  import { projectAuth, projectFirestore, projectStorage } from '@/firebase/config';
  
  export default {
    data() {
      return {
        user: null,
        photoPreview: null,
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
            this.user = currentUser;
          } else {
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
      },
      previewPhoto(event) {
        const file = event.target.files[0];
        if (file) {
          this.photoPreview = URL.createObjectURL(file);
        }
      },
      async uploadPhoto(event) {
        const file = event.target.files[0];
        const storageRef = projectStorage.ref(`profile_pictures/${this.user.uid}/${file.name}`);
        const uploadTask = storageRef.put(file);
  
        uploadTask.on(
          'state_changed',
          snapshot => {
            // Handle progress, if necessary
          },
          error => {
            console.error('Error uploading photo:', error);
          },
          async () => {
            const photoURL = await uploadTask.snapshot.ref.getDownloadURL();
            await this.user.updateProfile({ photoURL });
            await projectFirestore.collection('users').doc(this.user.uid).update({ photoURL });
            this.user.photoURL = photoURL;
            this.photoPreview = null;
          }
        );
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css?family=Exo:400,700');
  
  .profile {
    margin: 20px;
    font-family: 'Exo', sans-serif;
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
    margin-bottom: 10px;
  }
  
  input[type="file"] {
    margin-top: 10px;
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
  