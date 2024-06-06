<template>
    <div class="edit">
      <h2>Edit Recipe</h2>
      <form @submit.prevent="updateRecipe">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="editedRecipe.name" required>
        </div>
        <div>
          <label for="ingredients">Ingredients:</label>
          <textarea id="ingredients" v-model="editedRecipe.ingredients" required></textarea>
        </div>
        <div>
          <label for="regime">Regime:</label>
          <input type="text" id="regime" v-model="editedRecipe.regime" required>
        </div>
        <div>
          <label for="image">Image URL:</label>
          <input type="text" id="image" v-model="editedRecipe.image" required>
        </div>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        editedRecipe: {
          id: this.$route.params.id,
          name: '',
          ingredients: '',
          regime: '',
          image: ''
        },
        regimes: [] // Array to store the categories fetched from Firebase
      };
    },
    async created() {
      await this.fetchRecipe();
      await this.fetchRegimes(); // Fetch regimes when the component is created
    },
    methods: {
      async fetchRecipe() {
        try {
          const doc = await projectFirestore.collection('recipes').doc(this.editedRecipe.id.toString()).get();
          const recipeData = doc.data();
          this.editedRecipe = {
            ...this.editedRecipe,
            name: recipeData.name || '',
            ingredients: recipeData.ingredients ? recipeData.ingredients.join('\n') : '',
            regime: recipeData.regime || '',
            image: recipeData.image || ''
          };
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      },
      async fetchRegimes() {
        try {
          const regimesSnapshot = await projectFirestore.collection('categories').get();
          this.regimes = regimesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
        } catch (error) {
          console.error('Error fetching regimes:', error);
        }
      },
      async updateRecipe() {
        try {
          // Check if the entered regime name exists
          const regimeExists = this.regimes.some(regime => regime.name === this.editedRecipe.regime);
          if (!regimeExists) {
            alert('The entered regime name does not exist!');
            return;
          }
          
          // Find the regime id associated with the entered regime name
          const regimeId = this.regimes.find(regime => regime.name === this.editedRecipe.regime).id;
          
          const recipeRef = projectFirestore.collection('recipes').doc(this.editedRecipe.id.toString());
          await recipeRef.update({
            name: this.editedRecipe.name,
            ingredients: this.editedRecipe.ingredients.split('\n'),
            regime: this.editedRecipe.regime,
            image: this.editedRecipe.image
          });
          console.log('Recipe updated successfully!');
          // Redirect to recipe details page after update
        } catch (error) {
          console.error('Error updating recipe:', error);
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
  .edit {
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
  