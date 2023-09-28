import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
