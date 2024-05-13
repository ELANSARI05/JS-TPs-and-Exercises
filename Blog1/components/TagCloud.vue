<template>
      <div v-for="tag in uniqueTags" :key="tag" class="tag-container">
        <router-link :to="{ name: 'Tag', params: { name: tag } }" class="no-underline" ><p style="color: black;">{{ tag }}</p></router-link>
      </div>
  </template>  
  
  <script>
  export default {
    name: 'TagCloud',
    props: ['articles'],
    computed: {
    uniqueTags() {
      const tagsSet = new Set();
      this.articles.forEach(article => {
        article.tags.forEach(tag => {
          tagsSet.add(tag);
        });
      });
      return Array.from(tagsSet);
    }
  },
    methods: {
      async fetchArticles() {
        try {
          let res = await projectFirestore.collection('articles').get();
          this.articles = res.docs.map(doc => ({
            ...doc.data(), 
            id: doc.id 
          }));
        } catch (err) {
          this.error = err.message;
        }
      },
    }
  }
  </script>
  
  
  <style>
  .tag-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    background-color: rgb(218, 203, 203);
    color: var(--text-color);
    padding: 8px 12px;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }

  .tag-container:hover {
    background-color: var(--hover-bg-color);
    color: white;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 500;

}
.no-underline{
        text-decoration: none;
    }
</style>


