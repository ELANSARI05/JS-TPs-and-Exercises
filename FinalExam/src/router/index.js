import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NavBar from '../views/NavBar.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import userinfos from '../views/userinfos.vue'
import recipes from '../views/recipes.vue'
import Recipe from '../views/Recipe.vue'
import Edit from '../views/Edit.vue'
import Add from '../views/Add.vue'
import profile from '../views/Profile.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/Add',
    name: 'Add',
    component: Add
  },
  {
    path: '/Recipe/:id',
    name: 'Recipe',
    component: Recipe,
    params : true
  },
  {
    path: '/Edit/:id',
    name: 'Edit',
    component: Edit,
    params : true
  },
  {
    path: '/recipes/:id',
    name: 'recipes',
    component: recipes,
    params : true
  },
  {
    path: '/userinfos',
    name: 'userinfos',
    component: userinfos
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'NavBar',
    component: NavBar
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
