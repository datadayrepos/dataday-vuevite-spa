/**
 * Created by Ivar Strand Dec on 2021.12.19 11.43
 * This can be used to register commonly used components in the global space
 * Use sparingly
 * The use cases here are mostly that we can include these components
 * in javascript outside of vue SFC and return them conditionally
 */
import type { App } from 'vue'

// import AbyMiniToggle from '../components/abyMiniToggle/MiniToggle.vue'

// register components
export function registerComponents_aby(_app: App): void {
  // app.component('AbyMiniToggle', AbyMiniToggle)
}
