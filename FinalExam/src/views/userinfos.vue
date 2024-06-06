<template>
    <div class="registration-container">
      <div class="registration">
        <h2>Inscription</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="name">Nom:</label>
            <input type="text" id="name" v-model="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="diet">Régime alimentaire:</label>
            <select id="diet" v-model="diet" required>
              <option value="omnivore">Omnivore</option>
              <option value="vegetarian">Végétarien</option>
              <option value="vegan">Végétalien (Vegan)</option>
              <option value="pescetarian">Pescétarien</option>
              <option value="flexitarian">Flexitarien</option>
              <option value="fruitarian">Fruitarien</option>
              <option value="raw">Crudivore</option>
              <option value="paleo">Paléo</option>
              <option value="keto">Cétogène (Keto)</option>
              <option value="gluten_free">Sans gluten</option>
            </select>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { projectAuth, projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        diet: 'omnivore',
        error: null
      };
    },
    methods: {
      async register() {
        try {
          const userCredential = await projectAuth.createUserWithEmailAndPassword(this.email, this.password);
          await projectFirestore.collection('users').doc(userCredential.user.uid).set({
            name: this.name,
            email: this.email,
            diet: this.diet
          });
          this.$router.push("/home");
        } catch (error) {
          this.error = "Erreur lors de l'inscription. Veuillez réessayer.";
          console.error("Error registering user:", error);
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  padding: 20px;
  box-sizing: border-box;
}

.registration {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
}

.registration h2 {
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

.form-group input, .form-group select {
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
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  box-sizing: border-box;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
}
</style>
