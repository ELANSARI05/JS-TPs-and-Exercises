<template>
  <th style="font-family: Georgia, serif;color: black">{{ article.title }}</th>
  <td>{{ article.tags.join(', ') }}</td>
  <td style="font-family: cursive;">{{ article.snippet }}</td>
  <th>
    <img @click="emitDelete" :src="im" alt="" width="60px">
  </th>
</template>

<script>
import im from "./bin.png"

export default {
  name: 'SinglePost',
  props: ['article'],
  data() {
    return {
      im: im,
      articles: []
    };
  },
  methods: {
    emitDelete() {
      this.$emit('delete-article', this.article.id);
    }
  }
};
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
  
  .button_det {
    background-color: #3498db;
    /* Blue color */
    color: #fff;
    /* White text */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .button_det1 {
    background-color: red;
    /* Blue color */
    color: #fff;
    /* White text */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  /* Hover effect */
  .button_det:hover {
    background-color: #2980b9;
    /* Darker blue on hover */
  }
  </style>
  