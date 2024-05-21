<template>
    <div class="container">
      <div class="register-form">
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
        <router-link to="/">Already have an account? Login</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { projectAuth } from '../firebase/config';
  
  export default {
    name: "Register",
    data() {
      return {
        email: "",
        password: "",
        error: ""
      };
    },
    methods: {
      async register() {
        try {
          await projectAuth.createUserWithEmailAndPassword(this.email, this.password);
          this.$router.push("/home");
        } catch (error) {
          this.error = "Error creating account. Please try again.";
          console.error("Error registering:", error);
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
  
  .register-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto; /* Center the form horizontally */
  }
  
  .register-form h2 {
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
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
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
  