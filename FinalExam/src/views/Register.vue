<template>
  <div class="container">
    <div v-if="showForm" class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="Enter email"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Enter password"
          >
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="google-button" @click="signInWithGoogle">Sign In with Google</button>
      <router-link to="/login">Already have an account? Login</router-link>
    </div>

    <!-- Add the UserInfoForm component here -->
    <UserInfoForm v-else @submit-user-info="handleUserInfoSubmit" />
  </div>
</template>

<script>
import { projectAuth, projectFirestore, googleProvider } from '../firebase/config';

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showForm: true,
      userInfo: null,
      userId: null,
    };
  },
  methods: {
    async register() {
      try {
        // Create user with email and password
        const userCredential = await projectAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );

        // Save user information to Firestore
        await projectFirestore.collection("users").doc(userCredential.user.uid).set({
          email: this.email,
        });

        // Update local data
        this.userId = userCredential.user.uid;
        this.userInfo = { email: this.email };

        // Hide the registration form and show the user info form
        this.showForm = false;
      } catch (error) {
        this.error = "Error registering user. Please try again.";
        console.error("Error registering user:", error);
      }
    },

    async signInWithGoogle() {
      try {
        await projectAuth.signInWithPopup(googleProvider);
        this.$router.push("/userinfos");
      } catch (error) {
        this.error = "Error signing in with Google. Please try again.";
        console.error("Error signing in with Google:", error);
      }
    },

    handleUserInfoSubmit(userInfo) {
      // Handle user information submission from UserInfoForm component
      console.log("User information submitted:", userInfo);
      // Navigate to UserInfo.vue page
      this.$router.push("/userinfos");
    }
  }
};
</script>

<style>
/* Add your CSS styles here */
</style>
