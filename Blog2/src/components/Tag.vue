<template>
    <br><br>
    <div v-for="article in articles" >
        <div v-if="func(article)" style="border: groove;width: 50%;margin-left : 30%;padding: 30px">
            <p class="y" style="font-size: 30px"><b> {{ article.title }}</b></p>
            <div style="display: flex;justify-content:space-between">
            <div v-for="tag in article.tags"  >
                <p class="y" style="font-size: 17px;background-color: rgb(218, 203, 203)"> {{ tag }}</p>
            </div>
        </div>
        <br><br>
            <label style="margin-left: 0px"><b>Snippet</b></label>
            <p class="y"> {{ article.snippet }}</p>
        </div>
    </div>
</template>
  
  <script>
import {projectFirestore} from "../firebase/config"

  
  export default {
    name: 'Tag',
    data() {
      return {
        articles:[],
        name : this.$route.params.name
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
       func(article){
            for(let i=0;i<article.tags.length;i++){
                if(article.tags[i]== this.name)
                return 1
            }
            return 0
       }
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
.y {
    font-family: 'Arial', sans-serif;
    color: #555; /* Slightly lighter shade of gray for a softer look */
    font-size: calc(14px + 0.4vw); /* Responsive font size based on viewport width */
    line-height: 1.7;
    max-width: 80%; /* Relative to the parent container */
    margin: 1em auto;
    padding: 15px;
    background-color: #fff;
    border-left: 3px solid #e74c3c; /* Reddish border */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: left; /* Standard left align for general readability */
  }
</style>




  