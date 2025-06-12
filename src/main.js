import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router) // ✅ call .use() BEFORE mount
app.mount('#app') // ✅ .mount() comes last