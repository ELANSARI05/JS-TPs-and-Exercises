<template>
    <div>
      <div v-for="article in articles" :key="article.id">
        <div v-if="func(article)" class="article-card">
          <p class="article-title"><b>Title :</b></p>
          <p id="article-title1" >{{ article.title }}</p>
          <p class="article-title" >Tags :</p><br>
          <div class="tags-container">
            <div id="article-title1" v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</div>
          </div>
          <div class="snippet">
            <label><b>Snippet</b></label>
            <p id="article-title1">{{ article.snippet }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from "../firebase/config";
  
  export default {
    name: 'Tag',
    data() {
      return {
        articles: [],
        name: this.$route.params.name
      };
    },
    async mounted() {
      try {
        let res = await projectFirestore.collection('articles').get();
        this.articles = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        console.error(err.message);
      }
    },
    methods: {
      func(article) {
        return article.tags.includes(this.name);
      }
    }
  };
  </script>
  
  <style>
  /* Global font style */
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }
  
  /* Article card style */
  .article-card {
    border: 2px solid #ccc;
    padding: 20px;
    margin: 20px auto;
    max-width: 800px;
  }
  
  /* Article title style */
  .article-title {
    font-size: 30px;
    margin-bottom: 10px;
  }
  
  /* Tags container style */
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  
  /* Tag style */
  .tag {
    background-color: #f0f0f0;
    color: #333;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
  }
  
  /* Snippet style */
  .snippet {
    margin-top: 10px;
  }
  
  /* Label style */
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  #article-title1 {
    color: rgb(10, 10, 131);
    text-decoration: double;
    font-size: 17px
  }
  </style>
  
