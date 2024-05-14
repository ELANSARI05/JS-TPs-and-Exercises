<template>
    <div class="container3">
      <div class="list">
        <p style="font-size: 30px;"><b>List of articles</b></p>
        <table>
          <tr>
            <th id="up_th">Title</th>
            <th id="up_th">Tags</th>
            <th id="up_th">Snippet</th>
            <th id="up_th">Delete</th>
          </tr>
          <PostList :articles="articles" @delete-article-from-list="deleteArticle"></PostList>
        </table>
      </div>
      <div class="tag">
        <p style="font-size: 30px;"><b>List of tags</b></p>
        <TagCloud :articles="articles"></TagCloud>
      </div>
    </div>
  </template>
  
  <script>
  import PostList from './PostList.vue';
  import TagCloud from './TagCloud.vue';
  import {projectFirestore} from "../firebase/config"
  export default {
    name: 'Home',
    components: {
      PostList,
      TagCloud
    },
    data() {
      return {
        articles: []
      }
    },
    async mounted() {
      try {
        let res = await projectFirestore.collection('articles').get()
        this.articles = res.docs.map(doc => {
          // data are returned without the id, in order to get the id too we need to add it explicitly
          // ... is spread syntax
          return { ...doc.data(), id: doc.id }
        })
        console.log(articles);
      }
      catch(err) {
        this.error = err.message
      }
    },
    methods: {
      async deleteArticle(articleId) {
        try {
          await projectFirestore.collection('articles').doc(articleId).delete();
          this.articles = this.articles.filter(article => article.id !== articleId);
        } catch (err) {
          console.error("Error deleting article: ", err.message);
        }
      }
    }
  }
  </script>
  
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-left: 0px
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 20px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
#up_th{
    background-color: rgb(51, 49, 49);
    color : white
}
.add_but{
background-color: #3498db; /* Blue color */
  color: #fff; /* White text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
}
.tag{
    width: 45%
}
.container3 {
    display: flex
}
.list{
    width: 55%;
}
  </style>
  
