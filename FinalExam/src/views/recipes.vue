<template>
    <div class="recipes">
      <h2>Recipes</h2>
      <router-link :to="{ name: 'Add'}"><button>Add recipe</button></router-link>
      <div v-if="!selectedCategory">
        <!-- Show all recipes -->
        <div v-for="recipe in recipes" :key="recipe.id">
          <router-link :to="{ name: 'Recipe', params: { id: recipe.id } }">
            <div class="recipe-card" @click="viewDetails(recipe.id)">
              <h3>{{ recipe.name }}</h3>
              <p>{{ recipe.ingredients[0] }}</p>
              <p>{{ recipe.ingredients[1] }}</p><br><br>
              <div class="button-container">
                <router-link :to="{ name: 'Edit', params: { id: recipe.id } }">
                  <button @click.stop="editRecipe(recipe.id)" class="edit">Edit</button>
                </router-link><br><br>
                <button style="margin-left: 20px;" @click.stop="deleteRecipe(recipe.id)" class="delete">Delete</button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        recipes: [], // Array containing all recipes
        selectedCategory: null, // ID of the selected category
        id: this.$route.params.id,
      };
    },
    methods: {
      async fetchRecipes() {
        try {
          const recipesSnapshot = await projectFirestore.collection('recipes').get();
          this.recipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      },
      editRecipe(id) {
        // Navigate to edit page for the specified recipe
        this.$router.push(`/recipes/${id}/edit`);
      },
      async deleteRecipe(id) {
        try {
          await projectFirestore.collection('recipes').doc(id).delete();
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
          console.log('Recipe deleted successfully');
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      },
      viewDetails(id) {
        this.$router.push(`/Recipe/${id}`);
      }
    },
    computed: {
      filteredRecipes() {
        if (!this.selectedCategory) {
          return this.recipes; // If no category is selected, return all recipes
        } else {
          return this.recipes.filter(recipe => recipe.regime === this.selectedCategory);
        }
      }
    },
    created() {
      this.fetchRecipes(); // Fetch recipes when the component is created
    }
  };
  </script>
  
  <style scoped>
  .recipes {
    margin: 20px;
  }
  
  .recipe-card {
    position: relative;
    background-color: #f8f9fa;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  .recipe-card h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .recipe-card p {
    font-size: 16px;
    color: #555;
  }
  
  .recipe-card:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease-in-out;
  }
  
  .button-container {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex; /* Make the buttons container a flex container */
    justify-content: center; /* Center the buttons horizontally */
  }
  
  .button-container button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit {
    background-color: #ffc107;
    color: #000;
  }
  
  .delete {
    background-color: #dc3545;
    color: #fff;
  }
  </style>
  