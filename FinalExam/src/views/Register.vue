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
        const userCredential = await projectAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );

        await projectFirestore.collection("users").doc(userCredential.user.uid).set({
          email: this.email,
        });

        this.userId = userCredential.user.uid;
        this.userInfo = { email: this.email };
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
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  padding: 20px;
  box-sizing: border-box;
}

.register-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
}

.register-form h2 {
  margin-bottom: 20px;
  font-size: 26px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  box-sizing: border-box;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.google-button {
  margin-top: 10px;
  background-color: #db4437;
}

.google-button:hover {
  background-color: #c33d2e;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
}

a {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #28a745;
  font-size: 16px;
}

a:hover {
  text-decoration: underline;
}
</style>

