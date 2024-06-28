<template>
    <div class="edit">
      <h2>Edit thing</h2>
      <form @submit.prevent="editThing" class="thing-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="thing.name" required>
        </div>
        <div class="form-group">
          <label for="prize">Prize:</label>
          <input type="text" id="prize" v-model="thing.prize" required>
        </div>
        <button type="submit" class="submit-button">Save changes</button>
        <router-link to="/home">
          <button type="button" class="submit-button">Cancel</button>
        </router-link>
      </form>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '@/firebase/config';
  
  export default {
    data() {
      return {
        thing: {
          name: '',
          prize: '',
        }
      };
    },
    created() {
      this.fetchThing();
    },
    methods: {
      async fetchThing() {
        try {
          const thingId = this.$route.params.id;
          const thingDoc = await projectFirestore.collection('Things').doc(thingId).get();
          if (thingDoc.exists) {
            this.thing = thingDoc.data();
          } else {
            console.error('Thing not found');
          }
        } catch (error) {
          console.error('Error fetching thing:', error);
        }
      },
      async editThing() {
        try {
          const thingId = this.$route.params.id;
          await projectFirestore.collection('Things').doc(thingId).update({
            name: this.thing.name,
            prize: this.thing.prize,
          });
          console.log('Thing updated successfully');
          this.$router.push("/home");
        } catch (error) {
          console.error('Error updating thing:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .edit {
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
  
  .thing-form {
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
  