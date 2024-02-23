// import { registerComponents_ed } from '../jsonFormEditor/components/registerComponents_ed'
// import { registerComponents_el } from '../elementPlus/registerComponents_el'
// import { registerComponents_aby } from './register'
import type { App } from 'vue'
import { storeApp } from '../stores'

/**
 * Initial component configuration -
 * keep minimal as this is run on first load
 * Add specific comps relevat for the app here
 */
export function initComponentRegistration(_app: App<Element>) {
  // config components
  //  registerComponents_aby(app)
  // element plus UIX
  // registerComponents_el(app)
  // json form editor
  //  registerComponents_ed(app)
}

/** Initial project configuration */
export function initAppConfig() {
  const appStore = storeApp()
  // first we need to init the storage api
  appStore.initStorage()
  // init locale
  appStore.initLocale()
  // init userinfo
  appStore.initUser()
}

// we can add more configs here

// ----------------------------------------------------------------------
//  User object
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
//  Ticket object is the auth response object when asking for tickets
// ----------------------------------------------------------------------
