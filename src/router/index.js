import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin.vue'
import Discussion from '../views/Discussion.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
const routes = [

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
