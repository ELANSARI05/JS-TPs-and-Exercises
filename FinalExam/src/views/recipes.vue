<template>
    <div class="recipes">
      <h2>Recipes</h2>
      <div class="button-group">
        <router-link :to="{ name: 'Add' }">
          <button class="add-button">Add Recipe</button>
        </router-link>
        <router-link to="/home">
          <button class="home-button">Back to Home</button>
        </router-link>
      </div>
  
      <!-- Search Bar -->
      <div class="search-bar-container">
        <input type="text" v-model="searchQuery" placeholder="Search for recipes..." class="search-bar">
      </div>
  
      <div v-if="!selectedCategory">
        <!-- Show all recipes -->
        <div v-for="recipe in filteredRecipes" :key="recipe.id">
          <div v-if="id == '0' || id == recipe.regime" class="recipe-card">
            <div class="recipe-content" @click="viewDetails(recipe.id)">
              <router-link :to="{ name: 'Recipe', params: { id: recipe.id } }">
                <h3>{{ recipe.name }}</h3>
                <p>{{ recipe.ingredients[0] }}</p>
                <p>{{ recipe.ingredients[1] }}</p>
              </router-link>
            </div>
            <div class="button-container">
              <router-link :to="{ name: 'Edit', params: { id: recipe.id } }">
                <button @click.stop="editRecipe(recipe.id)" class="edit-button">Edit</button>
              </router-link>
              <button @click.stop="deleteRecipe(recipe.id)" class="delete-button">Delete</button>
            </div>
          </div>
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
        searchQuery: ''
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
      filterRecipesByCategory(categoryId) {
        // Filter recipes based on the selected category
        this.selectedCategory = categoryId;
      },
      resetCategoryFilter() {
        // Reset category filter to show all recipes
        this.selectedCategory = null;
      },
      editRecipe(id) {
        // Navigate to edit page for the specified recipe
        this.$router.push(`/recipes/${id}/edit`);
      },
      async deleteRecipe(id) {
        try {
          await this.deleteRecipeFromFirestore(id);
          // Remove the deleted recipe from the local array
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
          console.log('Recipe deleted successfully');
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      },
      async deleteRecipeFromFirestore(id) {
        try {
          const recipeDocRef = projectFirestore.collection('recipes').doc(id.toString());
          await recipeDocRef.delete();
        } catch (error) {
          console.error('Error deleting recipe from Firestore:', error);
          throw error;
        }
      },
      viewDetails(id) {
        this.$router.push(`/Recipe/${id}`);
      }
    },
    computed: {
      filteredRecipes() {
        if (!this.searchQuery) {
          return this.recipes;
        } else {
          return this.recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            recipe.ingredients.some(ingredient =>
              ingredient.toLowerCase().includes(this.searchQuery.toLowerCase())
            )
          );
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
    text-align: center;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .add-button, .home-button {
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .home-button {
    background-color: #007bff;
  }
  
  .add-button:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }
  
  .home-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  
  .search-bar-container {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .search-bar {
    width: 60%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #007bff;
    border-radius: 5px;
    margin-right: 10px;
    transition: border-color 0.3s;
  }
  
  .search-bar:focus {
    border-color: #0056b3;
    outline: none;
  }
  
  .recipe-card {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 600px;
  }
  
  .recipe-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  .recipe-content {
    margin-bottom: 10px;
  }
  
  .recipe-content h3 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .recipe-content p {
    font-size: 16px;
    color: #777;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 20px; /* Add this to separate the buttons */
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .edit-button {
    background-color: #ffc107;
    color: #000;
  }
  
  .edit-button:hover {
    background-color: #ffca28;
  }
  
  .delete-button {
    background-color: #dc3545;
    color: #fff;
  }
  
  .delete-button:hover {
    background-color: #e8495d;
  }
  </style>
  