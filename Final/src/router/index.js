import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import NavBar from '../views/NavBar.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import Profile from '../views/profile.vue';
import ADD from '../views/ADD.vue';
import Edit from '../views/Edit.vue';
import Detail from '../views/Detail.vue';
import { projectAuth } from '@/firebase/config';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'ADD',
    component: ADD,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'NavBar',
    component: NavBar
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Wait for Firebase to initialize the auth state
  projectAuth.onAuthStateChanged(user => {
    if (requiresAuth && !user) {
      next('/login');
    } else {
      next();
    }
  });
});

export default router;
