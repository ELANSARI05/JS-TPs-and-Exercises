<template>
    <div class="add">
      <h2>Add Recipe</h2>
      <form @submit.prevent="addRecipe">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="newRecipe.name" required>
        </div>
        <div>
          <label for="ingredients">Ingredients:</label>
          <textarea id="ingredients" v-model="newRecipe.ingredients" required></textarea>
        </div>
        <div>
          <label for="regime">Regime:</label>
          <input type="text" id="regime" v-model="newRecipe.regime" required>
        </div>
        <div>
          <label for="image">Image URL:</label>
          <input type="text" id="image" v-model="newRecipe.image" required>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        newRecipe: {
          name: '',
          ingredients: '',
          regime: '',
          image: ''
        }
      };
    },
    methods: {
      async addRecipe() {
        try {
          const newRecipeRef = await projectFirestore.collection('recipes').add({
            name: this.newRecipe.name,
            ingredients: this.newRecipe.ingredients.split('\n'),
            regime: this.newRecipe.regime,
            image: this.newRecipe.image
          });
          console.log('Recipe added successfully with ID:', newRecipeRef.id);
          // Reset the form fields after adding the recipe
          this.newRecipe = {
            name: '',
            ingredients: '',
            regime: '',
            image: ''
          };
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
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  textarea,
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  