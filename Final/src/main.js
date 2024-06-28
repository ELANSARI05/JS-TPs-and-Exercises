import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { projectAuth } from '@/firebase/config';

let app;

// Wait for Firebase to initialize the auth state
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app');
  }
});
