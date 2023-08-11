// import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
  clientId: '1013683952007-nkg3t009klr6nq97o5bukahjvq9s1g3l.apps.googleusercontent.com'
});

app.use(pinia)
app.use(router)

app.mount('#app')
