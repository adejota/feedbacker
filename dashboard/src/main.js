import { createApp } from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import App from './App.vue'
import { router } from './router'

// lib de animações
import 'animate.css'

// lib de css
import '@/assets/css/tailwind.css'

// fonts
import '@/assets/css/fonts.css'

// lib de alertas bonitinhos para o usuário
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(Toast, { position: POSITION.BOTTOM_RIGHT })
app.mount('#app')
