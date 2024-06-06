import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import your Firebase configuration
import './firebase/config';

const app = createApp(App);

app.use(router);

app.mount('#app');
