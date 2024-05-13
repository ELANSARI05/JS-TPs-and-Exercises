<template>
    <template v-for="article in articles">
      <tr>
        <SinglePost :article="article" @delete-article="emitDeleteArticle"></SinglePost>
      </tr>
      <tr>
        <th style="border: unset">
            <div style="display: flex;">
            <router-link :to="{ name: 'Post', params: { id: article.id } }"><button @click=""  class="button_det1" style="">Show details</button></router-link>
            <router-link :to="{name :'EDIT', params : {id : article.id } }"><button  class="button_det" style="margin-left: 20px;margin-top: 0px">Modify</button></router-link>
           </div>
        </th>
      </tr>
    </template>
    
</template>
  
  <script>
  import SinglePost from './SinglePost.vue';
  
  export default {
    name: 'PostList',
    components: {
      SinglePost
    },
    props : ['articles'],
    data() {
      return {
      }
    },
    methods: {
      emitDeleteArticle(articleId) {
        this.$emit('delete-article-from-list', articleId);
      },
      show_details(article) {
        this.$router.push({ name: 'Post', params: { id: article.id } }); 
    },
    }
  }
  </script>
  
  
  <style>
  <style>
.button_det1, .button_det {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none; /* Removes underline from links */
}

.button_det1 {
  background-color: #2980b9; /* Blue */
  margin-right: 20px; /* Space between buttons */
}

.button_det {
  background-color: #27ae60; /* Green */
}

.button_det1:hover, .button_det:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  background-color: #3498db; /* Lighter blue for details button */
}

.button_det:hover {
  background-color: #2ecc71; /* Lighter green for modify button */
}
</style>




  