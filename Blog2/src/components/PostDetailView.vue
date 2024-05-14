<template>
    <div class="container">
      <div v-for="article in articles" :key="article.id">
        <div class="details1" v-if="article.id == articleId">
          <h1 class="article-title">Details for this article:</h1>
          <div class="info-section">
            <div><b>The title:</b> {{ article.title }}</div><br>
            <div><b>The body:</b> {{ article.body }}</div><br>
            <div><b>The snippet:</b> {{ article.snippet }}</div><br>
            <div><b>The tags:</b> </div><br>
            <div class="tags-container">
              <div v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</div>
            </div><br>
            <div><b>The creation date:</b> {{ article.createdAt }}</div><br>
            <div><b>The modification date:</b> {{ article.modifiedAt }}</div><br>
          </div>
        </div>
      </div>
      <br>
      <button class="redirect" @click="func()">Redirect</button>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from "../firebase/config";
  
  export default {
    name: 'Post',
    data() {
      return {
        articles: [],
        articleId: this.$route.params.id,
        error: null
      };
    },
    methods: {
      func() {
        this.$router.push({ name: 'Home' });
      }
    },
    async mounted() {
      try {
        let res = await projectFirestore.collection('articles').get();
        this.articles = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        this.error = err.message;
      }
    }
  };
  </script>
  
  <style>
  /* Container styles */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

  }
  
  /* Article card styles */
  .details1 {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
    border: 2px solid #ccc;
    padding: 20px;
    margin: 20px 0;
    max-width: 800px;
  }
  
  /* Article title styles */
  .article-title {
    font-size: 30px;
    margin-bottom: 10px;
  }
  
  /* Info section styles */
  .info-section {
    margin-top: 20px;
  }
  
  /* Tag styles */
  .tag {
    background-color: #f0f0f0;
    color: #333;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
  }
  
  /* Redirect button styles */
  .redirect {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .redirect:hover {
    background-color: #2980b9;
  }
  </style>
  
