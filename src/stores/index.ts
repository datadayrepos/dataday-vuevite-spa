import type { App } from 'vue'
import { createPinia } from 'pinia'

// https://pinia.esm.dev/introduction.html
const store = createPinia()

export { store }
export { storeApp, storeAppWithOut } from './modules/appStore'

export function setupStore(app: App<Element>) {
  app.use(store)
}
