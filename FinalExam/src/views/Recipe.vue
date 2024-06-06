<template>
    <div class="recipe-page">
      <div v-for="recipe in recipes" :key="recipe.id">
        <div v-if="recipe.id == id" class="recipe">
          <h2>{{ recipe.name }}</h2>
          <div class="details">
            <div class="image-container">
              <img :src="recipe.image || placeholderImage" alt="Recipe Image">
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
          <div class="feedback-section">
            <h3>Give Feedback</h3>
            <form @submit.prevent="submitFeedback">
              <div class="form-group">
                <label for="comment">Comment:</label>
                <textarea id="comment" v-model="newComment" required></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
            <p v-if="feedbackMessage" class="feedback-message">{{ feedbackMessage }}</p>
          </div>
          <router-link :to="{ name: 'recipes', params: { id: recipe.regime} }" class="back-button">Back to Recipes</router-link>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        recipes: [],
        id: this.$route.params.id,
        placeholderImage: 'https://via.placeholder.com/400x300?text=Recipe+Image', // Placeholder image URL
        newComment: '',
        feedbackMessage: ''
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
      },
      async submitFeedback() {
        if (this.newComment.trim() === '') return;
        
        try {
          const recipeDocRef = projectFirestore.collection('recipes').doc(this.id);
          const recipeDoc = await recipeDocRef.get();
          
          if (recipeDoc.exists) {
            const recipeData = recipeDoc.data();
            const updatedComments = recipeData.comments ? [...recipeData.comments, this.newComment] : [this.newComment];
            
            await recipeDocRef.update({
              comments: updatedComments
            });
            
            this.feedbackMessage = "Feedback submitted successfully!";
            this.newComment = '';
            setTimeout(() => {
              this.feedbackMessage = '';
            }, 3000);
          }
        } catch (error) {
          console.error('Error submitting feedback:', error);
          this.feedbackMessage = "Error submitting feedback. Please try again.";
          setTimeout(() => {
            this.feedbackMessage = '';
          }, 3000);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .recipe-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #f9f9f9;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
  }
  
  .recipe {
    margin: 20px;
    background-color: #fff;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 900px;
    width: 100%;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .recipe:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  .recipe h2 {
    font-size: 36px;
    margin-bottom: 25px;
    color: #2c3e50;
    text-align: center;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .image-container {
    width: 100%;
    margin-bottom: 30px;
  }
  
  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .info {
    width: 100%;
    text-align: center;
  }
  
  .ingredients, .instructions {
    margin-bottom: 40px;
  }
  
  .ingredients h3, .instructions h3 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #e67e22;
  }
  
  .ingredients ul, .instructions ol {
    list-style-type: none;
    padding: 0;
  }
  
  .ingredients ul li, .instructions ol li {
    font-size: 18px;
    color: #7f8c8d;
    margin-bottom: 10px;
    background: #ecf0f1;
    padding: 10px;
    border-radius: 8px;
    transition: background 0.3s;
  }
  
  .ingredients ul li:hover, .instructions ol li:hover {
    background: #bdc3c7;
  }
  
  .feedback-section {
    margin-top: 30px;
    text-align: center;
  }
  
  .feedback-section h3 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #27ae60;
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
  
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    resize: vertical;
  }
  
  .feedback-message {
    margin-top: 15px;
    font-size: 16px;
    color: #27ae60;
    font-weight: bold;
  }
  
  button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #e67e22;
    color: #fff;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    text-align: center;
  }
  
  button:hover {
    background-color: #d35400;
    transform: translateY(-2px);
  }
  
  .back-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    text-align: center;
    margin-top: 20px;
  }
  
  .back-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
  </style>
  