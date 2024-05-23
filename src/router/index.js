import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin.vue'
import Discussion from '../views/Discussion.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import NewDiscussion from '../views/NewDiscussion.vue';
import mydiscussion from '../views/mydiscussion.vue';


const routes = [
  
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/discussion/:id/:userId',
    name: 'Discussion',
    component: Discussion,
    props: true
  },
  {
    path: '/mydisc/:id/:userId',
    name: 'Discussion',
    component: Discussion,
    props: true
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/new-discussion',
    name: 'NewDiscussion',
    component: NewDiscussion
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
