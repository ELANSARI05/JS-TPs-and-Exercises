<template>
  <div class="navbar-container">
    <div class="navbar">
      <div class="logo">
        <img :src="logo" alt="Logo">
      </div>
      <div class="app-description">
        <h1>Welcome to Recipe Cooking</h1>
        <p>Discover, create, and share delicious recipes from around the globe. Join our community of food enthusiasts and explore the endless possibilities of culinary arts.</p>
      </div>
      <div class="cta-button">
        <router-link to="/login">
          <button class="explore-button">Explore Our World of Food</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import logo from '../assets/food.jpg'
import backgroundImage from '../assets/R.jpg'

export default {
  name: "NavBar",
  data() {
    return {
      logo: logo,
      backgroundImage: backgroundImage
    };
  }
};
</script>

  
<style scoped>
.navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-image: url('../assets/R.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}

.logo img {
  width: 150px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 20px;
}

.app-description h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.app-description p {
  font-size: 18px;
  color: #666;
  max-width: 600px;
}

.cta-button {
  margin-top: 20px;
}

.explore-button {
  background-color: #007bff;
  color: #fff;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.explore-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>
