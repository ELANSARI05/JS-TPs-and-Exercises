<template>
    <div class="registration">
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <label for="name">Nom:</label>
        <input type="text" id="name" v-model="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
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
        <router-link to="/home"><button type="submit">S'inscrire</button></router-link>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
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
      
    }
  };
  </script>
  
  <style scoped>
  .registration {
    margin: 0 auto;
    width: 50%;
  }
  
  .registration h2 {
    text-align: center;
  }
  
  .registration form {
    display: flex;
    flex-direction: column;
  }
  
  .registration label {
    margin-bottom: 5px;
  }
  
  .registration input, .registration select {
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
  }
  
  .registration button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  </style>
  