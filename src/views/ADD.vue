<template>
    <div class="add">
      <h2>Add thing</h2>
      <form @submit.prevent="addthing" class="recipe-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="newthing.name" required>
        </div>
        <div class="form-group">
          <label for="ingredients">prize:</label>
          <input type="text" id="prize" v-model="newthing.prize" required>
        </div>
        <button type="submit" class="submit-button">Add thing</button>
        <router-link to="/home">
            <button class="submit-button">Cancel</button>
        </router-link>
      </form>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        newthing: {
          name: '',
          prize: '',
        }
      };
    },
    methods: {
      async addthing() {
        try {
          const newRecipeRef = await projectFirestore.collection('Things').add({
            name: this.newthing.name,
            prize: this.newthing.prize,
          });
          console.log('Recipe added successfully with ID:', newRecipeRef.id);
          // Reset the form fields after adding the recipe
          this.newthing = {
            name: '',
            prize: ''
          };
          this.$router.push("/home");
        } catch (error) {
          console.error('Error adding recipe:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add {
    margin: 20px;
    font-family: 'Arial', sans-serif;
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
  
  .recipe-form {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  textarea {
    resize: vertical;
  }
  
  input[type="text"]:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    align-self: center;
  }
  
  .submit-button:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }
  </style>
  