import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Menampilkan konten dengan router yang sedang aktif
createApp(App).use(router).mount('#app')
