<template>
    <div class="container">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
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
          <button type="submit">Login</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
        <button class="google-button" @click="signInWithGoogle">Sign In with Google</button>
        <router-link to="/register">Don't have an account? Sign up</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { projectAuth, googleProvider ,facebookProvider } from '../firebase/config';
  
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        error: ""
      };
    },
    methods: {
      async login() {
        try {
          await projectAuth.signInWithEmailAndPassword(this.email, this.password);
          this.$router.push("/home");
        } catch (error) {
          this.error = "Invalid email or password. Please try again.";
          console.error("Error logging in:", error);
        }
      },
      async signInWithGoogle() {
        try {
          await projectAuth.signInWithPopup(googleProvider);
          this.$router.push("/home");
        } catch (error) {
          this.error = "Error signing in with Google. Please try again.";
          console.error("Error signing in with Google:", error);
        }
      },
      async signInWithfacebook() {
        try {
          await projectAuth.signInWithPopup(facebookProvider);
          this.$router.push("/home");
        } catch (error) {
          this.error = "Error signing in with Google. Please try again.";
          console.error("Error signing in with Google:", error);
        }
      }
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .login-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto; /* Center the form horizontally */
  }
  
  .login-form h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .google-button {
    margin-top: 10px;
    background-color: #db4437;
  }
  
  .google-button:hover {
    background-color: #c33d2e;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  
  a {
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #007bff;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  