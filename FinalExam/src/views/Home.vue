<template>
  <div class="home">
    <header class="header">
      <div class="logo">
        <img :src="logo" alt="Logo">
      </div>
      <nav class="navigation">
        <router-link :to="{ name: 'recipes', params: { id:'0'} }">
          <button class="nav-button">Recipes</button>
        </router-link>

        <router-link to="/profile" class="nav-button profile-button">
          <svg xmlns="http://www.w3.org/2000/svg" class="profile-icon" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M12 12c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Profile
        </router-link>
      </nav>
    </header>

    <!-- Search Bar -->
    <div class="search-bar-container">
      <input type="text" v-model="searchQuery" placeholder="Search for categories..." class="search-bar">
    </div>

    <!-- Banner -->
    <section class="banner">
      <div class="slogan">
        <h2>Explore and Share Delicious Recipes</h2>
      </div>
    </section>

    <!-- Category List -->
    <section class="categories">
      <h3>Categories</h3>
      <div class="category-grid">
        <div class="category-card" v-for="category in filteredCategories" :key="category.id">
          <router-link :to="{ name: 'recipes', params: { id: category.name } }">
            <div class="category-content">
              <h4>{{ category.name }}</h4>
              <p>{{ category.exampleFoods[0] }}</p>
              <p>{{ category.exampleFoods[1] }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="contact">
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="legal">
        <router-link to="/legal">Legal</router-link>
      </div>
      <div class="social">
        <a href="https://facebook.com">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </footer>
  </div>
</template>


<script>
import { projectFirestore } from '@/firebase/config';
import logo from '../assets/food.jpg'

export default {
  data() {
    return {
      categories: [],
      logo: logo,
      searchQuery: ''
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const categoriesSnapshot = await projectFirestore.collection('categories').get();
        this.categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  },
  computed: {
    filteredCategories() {
      if (!this.searchQuery) {
        return this.categories;
      } else {
        return this.categories.filter(category =>
          category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  }
};
</script>


<style scoped>
.home {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 100px;
  height: auto;
}

.navigation {
  display: flex;
  align-items: center;
}

.nav-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.profile-button {
  background-color: #fff;
  color: #007bff;
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 24px;
  height: 24px;
  fill: #007bff;
  margin-right: 5px;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #007bff;
  border-radius: 5px;
  margin-right: 10px;
  transition: border-color 0.3s;
}

.search-bar:focus {
  border-color: #0056b3;
  outline: none;
}

.banner {
  text-align: center;
  padding: 50px 20px;
  background: linear-gradient(to right, #007bff, #0056b3);
  color: #fff;
}

.slogan h2 {
  font-size: 36px;
  font-weight: bold;
}

.categories {
  padding: 20px;
}

.categories h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #007bff;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-content {
  padding: 20px;
}

.category-card h4 {
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0 10px;
  color: #343a40;
}

.category-card p {
  font-size: 14px;
  color: #666;
}

.footer {
  padding: 20px;
  background-color: #343a40;
  color: #fff;
  text-align: center;
}

.footer a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  font-size: 20px;
}

.footer a:hover {
  color: #007bff;
}

.footer .social a {
  display: inline-block;
  margin: 0 10px;
}

.footer .social i {
  font-size: 20px;
  color: #fff;
  transition: color 0.3s;
}

.footer .social i:hover {
  color: #007bff;
}
</style>
