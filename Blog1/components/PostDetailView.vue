<template>
    <br><br>
    <div v-for="article in articles">
       <div class="details1" v-if="article.id == articleId">
        <p style="font-size: 30px;"><b>Details for this article : </b></p><br><br>
            <label><span><b>The title : </b></span> {{ article.title }} </label><br><br><br>
            <div style="width: 50%;margin-left: 30%"><span><b> The body : </b></span> {{ article.body }} </div><br><br><br>
            <div style="width: 50%;margin-left: 30%"><span><b>The snippet : </b></span> {{ article.snippet }}</div>
            <div v-for="tag in article.tags"  >
                <p class="y" style="font-size: 17px;background-color: rgb(218, 203, 203)"> {{ tag }}</p>
            </div>
            <div><span><b>The creation date : </b></span> {{ article.createdAt }}</div> <br><br><br>
            <div><span><b>The modification date : </b></span> {{ article.modifiedAt }}</div> <br><br><br>


       </div>
    </div><br>
    <button class="redirect"@click="func()">Redirect</button>
  </template>
  
  <script>
  import {projectFirestore} from "../firebase/config"

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
        let res = await projectFirestore.collection('articles').get()
        this.articles = res.docs.map(doc => {
          // data are returned without the id, in order to get the id too we need to add it explicitly
          // ... is spread syntax
          return { ...doc.data(), id: doc.id }
        })  
      }
      catch(err) {
        this.error = err.message
      }
    }
  }
</script>
<style>
/* Applying a general font style that will be inherited */
.details1 {
  font-family: 'Helvetica Neue', Arial, sans-serif; /* This is a clean and modern font family */
  color: #333; /* This is a darker shade for better readability */
  border: groove;
  width: 60%;
  margin-left: 20%
}

/* Specific styles for paragraphs and labels */
p, label {
  font-size: 18px; /* Adjusted for better readability */
  line-height: 1.6; /* Line height for optimal text readability */
  color: #444; /* Slightly lighter than the default for a softer appearance */
}

/* Highlighting the labels with a stronger emphasis */
b {
  color: #2c3e50; /* A darker, richer color for important text */
  font-weight: bold; /* Ensuring bold text is actually bold */
}

/* Specific styles for tags to differentiate them from other text */
.y {
  background-color: #dae0e5; /* A softer background color for tags */
  color: #333; /* Dark color for the tag text for contrast */
  padding: 5px 10px; /* Padding for a better tag appearance */
  margin: 2px; /* Margin around tags to separate them from surrounding text */
  border-radius: 8px; /* Rounded corners for tags */
  display: inline-block; /* Making tags inline-block for better flow */
}

/* Styles for the 'Redirect' button */
.redirect {
  background-color: #3498db; /* A bright, appealing blue */
  color: white; /* White text for contrast */
  padding: 12px 24px; /* Generous padding for a clickable area */
  font-size: 16px; /* Larger font size for readability */
  border: none; /* No border for a cleaner look */
  border-radius: 4px; /* Slightly rounded corners */
  cursor: pointer; /* Cursor pointer to indicate it's clickable */
  transition: background-color 0.2s; /* Smooth transition for hover effect */
}

.redirect:hover {
  background-color: #2980b9; /* A slightly darker blue on hover */
}
</style>

  