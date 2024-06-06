<template>
    <div v-for="recipe in recipes">
      <div v-if="recipe.id == id" class="recipe">
        <h2>{{ recipe.name }}</h2>
        <div class="details">
          <div class="image-container">
            <img :src="recipe.image" alt="Recipe Image">
          </div>
          <div class="info">
            <div class="ingredients">
              <h3>Ingredients</h3>
              <ul>
                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient }}</li>
              </ul>
            </div>
            <div class="instructions">
              <h3>Instructions</h3>
              <ol>
                <li v-for="(instruction, index) in recipe.instructions" :key="index">{{ instruction }}</li>
              </ol>
            </div>
          </div>
        </div>
        <router-link to="/recipes" class="back-button">Back to Recipes</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'; // Assuming you're using Vue 3
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        recipes: [],
        id: this.$route.params.id,
      };
    },
    created() {
      this.fetchRecipes(); // Fetch recipes when the component is created
    },
    methods: {
      async fetchRecipes() {
        try {
          const recipesSnapshot = await projectFirestore.collection('recipes').get();
          this.recipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .recipe {
    margin: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .recipe h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .details {
    display: flex;
  }
  
  .image-container {
    width: 50%;
  }
  
  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .info {
    width: 50%;
    padding-left: 20px;
  }
  
  .ingredients, .instructions {
    margin-bottom: 30px;
  }
  
  .ingredients h3, .instructions h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #555;
  }
  
  .ingredients ul, .instructions ol {
    list-style-type: none;
    padding: 0;
  }
  
  .ingredients ul li, .instructions ol li {
    font-size: 16px;
    color: #555;
    margin-bottom: 5px;
  }
  
  .back-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .back-button:hover {
    background-color: #0056b3;
  }
  </style>
  