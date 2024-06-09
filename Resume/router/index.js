import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NavBar from '../views/NavBar.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import infos from '../views/UserInfoForm.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/infos',
    name: 'infos',
    component: infos
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/resume/:id/:cvid',
    name : 'Resume',
    component : Resume,
    params : true
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
