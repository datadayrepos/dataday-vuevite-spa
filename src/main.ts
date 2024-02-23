import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router/routes.js'
import App from './App.vue'
import { createPinia } from 'pinia'

// aby base styles - no  css stylesheets used here
// import './styles/bootstrap'

// tailwind
import './styles/tw/tailwind.css'

import { initAppConfig, initComponentRegistration } from '/@/config'

const head = createHead()
const pinia = createPinia()

/** main setup func */
async function setup() {
  /*
  //only when using virtual router
  const router = await createRouter({
    history: createWebHistory(),
    routes: setupLayouts(routes) as RouteRecordRaw[],//routes,//
  })
  */

  const app = createApp(App)
  app.use(pinia)
  // Initialize internal system configuration
  await initAppConfig() // Initializes userStore and locale

  app.use(head)
  app.use(router)

  // Initialize uix compoenents
  initComponentRegistration(app)

  // dev set performance monitorig
  if (process.env.NODE_ENV === 'development')
    app.config.performance = true

  // globalLangConfig.initLangPack(); // Initializes the global language pack

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  // await setupI18n(app);

  // mounts app to #app element in dom
  app.mount('#app')
}

// console.log('Application starting up...')
// console.log('Current URL:', window.location.href)

// run setup
setup()