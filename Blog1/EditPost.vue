<template>
    <br><br>
    <div class="details">
      <p style="font-size: 30px;"><b>Give the information you want to update for this article:</b></p><br><br>
      <label><b>The title:</b> <input v-model="updatedData.title" type="text"></label><br><br><br>
      <label><b>The body:</b> <textarea v-model="updatedData.body"></textarea></label><br><br><br>
      <label><b>The creation date:</b> <input v-model="updatedData.createdAt" type="date"></label><br><br><br>
      <label><b>The modification date:</b> <input v-model="updatedData.modifiedAt" type="date"></label><br><br><br>
      <label><b>The tags:</b> <input v-model="stri" placeholder="separated with commas,"></label><br><br><br>
    </div><br><br>
    <button class="redirect" @click="func()">Save</button>
    <router-link to="/Home" class="no-underline"><button class="redirect1">Cancel</button></router-link>
  </template>
  
  <script>
  import {projectFirestore} from "../firebase/config"
  
  export default {
    name: 'EDIT',
    data() {
      return {
        stri : "",
        updatedData: {
          title: "",
          body: "",
          createdAt: "",
          modifiedAt: "",
          tags: []
        },
        articleId: this.$route.params.id,
      };
    },
    async mounted() {
      try {
        const doc = await projectFirestore.collection('articles').doc(this.articleId).get();
        if (doc.exists) {
          this.updatedData = { ...doc.data(), id: doc.id }; // Populate data for updating
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching article: ", err);
      }
    },
    methods: {
      async func() {
        if (!this.updatedData.title || !this.updatedData.body || !this.updatedData.createdAt ||
            !this.updatedData.modifiedAt || !this.stri) {
          alert("Please fill all fields properly.");
          return;
        }
        try {
          await projectFirestore.collection('articles').doc(this.articleId).update({
            title: this.updatedData.title,
            body: this.updatedData.body,
            createdAt: this.updatedData.createdAt,
            modifiedAt: this.updatedData.modifiedAt,
            snippet : this.updatedData.body.substring(0, 50),
            tags: this.stri.split(',').map(tag => tag.trim()) // Convert string to array
          });
          this.$router.push('/Home');
        } catch (err) {
          console.error("Error updating article: ", err);
          alert("Failed to update article.");
        }
      }
    }
  }
  </script>
  
<style>
 .details{
     border: groove;
     border-color: rgb(238, 56, 56);
     border-width: 20px;
     width: 70%;
     margin-left: 15%
     
 }
 .redirect{
     background-color: rgb(250, 66, 66); 
     color: #fff; /* White text */
     border: none;
     padding: 10px 20px;
     border-radius: 5px;
     cursor: pointer;
     font-size: 16px;
 }
 .redirect1{
     background-color: green; 
     color: #fff; /* White text */
     border: none;
     padding: 10px 20px;
     border-radius: 5px;
     cursor: pointer;
     font-size: 16px;
     margin-left: 20px;
     text-decoration: none;
 }
 .no-underline{
     text-decoration: none;
     color: white;
 }
</style>
