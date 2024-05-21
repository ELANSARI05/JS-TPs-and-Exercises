<template>
    <div class="new-discussion">
      <h2>Create a New Discussion</h2>
      <form @submit.prevent="addDiscussion">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" v-model="title" class="form-control" id="title" required>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea v-model="content" class="form-control" id="content" required></textarea>
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <input type="text" v-model="category" class="form-control" id="category" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Discussion</button>
      </form>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '../firebase/config';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
        category: '',
      };
    },
    methods: {
      async addDiscussion() {
        try {
          const newDiscussion = {
            title: this.title,
            content: this.content,
            category: this.category,
            createdBy: localStorage.getItem('userId'), // Assuming userId is stored in localStorage
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            replies: []
          };
          await projectFirestore.collection('Discussions').add(newDiscussion);
          this.$router.push('/home');
        } catch (err) {
          console.error('Error adding discussion:', err);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .new-discussion {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  