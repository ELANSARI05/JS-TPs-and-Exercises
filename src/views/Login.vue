<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <b-card title="Login" class="text-center">
            <b-form @submit.prevent="login">
              <b-form-group label="Email address" label-for="email">
                <b-form-input
                  id="email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Password" label-for="password">
                <b-form-input
                  id="password"
                  type="password"
                  v-model="password"
                  required
                  placeholder="Password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary" block>Login</b-button>
            </b-form>
            <b-alert
              variant="danger"
              show
              dismissible
              v-if="error"
              class="mt-3"
            >
              {{ error }}
            </b-alert>
            <router-link to="/signup" class="d-block mt-3">Don't have an account? Sign up</router-link>
          </b-card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { projectAuth } from '../config';
  
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
          this.$router.push("/");
        } catch (error) {
          this.error = "Invalid email or password. Please try again.";
          console.error("Error logging in:", error);
        }
      }
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 400px;
  }
  </style>
  