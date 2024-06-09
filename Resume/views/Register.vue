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
            class="form-control"
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
            class="form-control"
          >
        </div>
        <button type="submit" class="btn btn-primary btn-block">Register</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="google-button btn btn-danger btn-block" @click="signInWithGoogle">Sign In with Google</button>
      <router-link to="/login" class="d-block text-center mt-2">Already have an account? Login</router-link>
    </div>
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
      userId: null,
    };
  },
  methods: {
    async register() {
      try {
        const userCredential = await projectAuth.createUserWithEmailAndPassword(this.email, this.password);
        const user = userCredential.user;
        this.userId = user.uid;
        const userDoc = await projectFirestore.collection('Person').doc(user.uid).get();

        if (userDoc.exists) {
          this.$router.push("/home");
        } else {
          this.$router.push("/infos"); // Redirect to the user info form
        }
      } catch (error) {
        this.error = "Error creating account. Please try again.";
        console.error("Error registering:", error);
      }
    },
    async signInWithGoogle() {
      try {
        const userCredential = await projectAuth.signInWithPopup(googleProvider);
        const user = userCredential.user;
        this.userId = user.uid;
        const userDoc = await projectFirestore.collection('Person').doc(user.uid).get();

        if (userDoc.exists) {
          this.$router.push("/home");
        } else {
          this.$router.push("/infos"); // Redirect to the user info form
        }
      } catch (error) {
        this.error = "Error signing in with Google. Please try again.";
        console.error("Error signing in with Google:", error);
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://www.toptal.com/designers/subtlepatterns/patterns/grid.png');
  background-size: cover;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.register-form {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.register-form h2 {
  margin-bottom: 20px;
  font-size: 26px;
  text-align: center;
  color: #333333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #007bff;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.google-button {
  margin-top: 15px;
  background-color: #db4437;
}

.google-button:hover {
  background-color: #c33d2e;
}

.error {
  color: red;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}

a {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #007bff;
  transition: color 0.3s ease;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

</style>
