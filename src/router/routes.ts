import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import App from '/@/App.vue'
import { h, resolveComponent } from 'vue'
import { FALLBACK_LOCALE, LOCALES_OBJECT } from '/@/locales/init/constants'
import { getLocale, useAbyLocale } from '/@/locales/useAbyLocale'
import { storeApp } from '/@/stores'

// for route imports
import { navbar } from '/@/pages/navbar/routes'
import { dashboard } from '/@/pages/dashboard/routes'

// import { getDefaultLocaleSetting } from '/@/locales/init'

/** nav-bar base layout  with lang select and dark mode switch */
const NavBarLayout = () => import('/@/layouts/navbarStyle/NavBarLayout.vue')

const spaBasePath = import.meta.env.VITE_SPA_PATH

/** Root domain to redirect to as external URL link since we are serving this app from a subdirectory */

//  Root
const root: RouteRecordRaw = {
  path: '/',
  component: App,
  name: 'root',
  redirect: { name: 'root-redirect' },
  /*  dont think we need this in ay config
  beforeEnter(_to: any, _from: any, next: () => void) {
    let lang = getLocale()
    if (!lang)
      lang = getDefaultLocaleSetting().locale
    // console.log(lang)
    next()
  },
 */
  children: [
    {
      path: 'root-redirect',
      name: 'root-redirect',
      meta: { requiresAuth: false },
      redirect: { name: 'dashboard-1' },
    },
  ],

}

const notFound: RouteRecordRaw = {
  name: 'error',
  path: '/error', // "base" if using locale prefixer
  component: NavBarLayout,
  redirect: { name: '404' },
  children: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: { requiresAuth: false },
      component: () => import('/@/pages/404/404Page.vue'),
    },
  ],
}

const { changeLocale } = useAbyLocale()

/**
 * checks auth status from pinia store
 */
function getUserAuth() {
  return storeApp().getAuthStatus
}

/**
 * Creates regex (en|fr)
 */
export function getLocaleRegex() {
  let reg = ''
  LOCALES_OBJECT.forEach((locale: { value: any }, index: number) => {
    reg = `${reg}${locale?.value}${index !== LOCALES_OBJECT.length - 1 ? '|' : ''
            }`
  })
  return `(${reg})`
}

/**
 * Returns locale configuration
 */
function getLocaleInConfig(locale = 'en') {
  return LOCALES_OBJECT.find((loc: { value: string }) => loc?.value === locale)
}

function setLang(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  let locale: string = to.params.locale as string
  if (!locale) {
    locale = getLocale() || FALLBACK_LOCALE
    to.params.locale = locale
  }
  if (getLocaleInConfig(locale)) {
    const curLocale = getLocale() // getLocaleRefreshed()  getLocale()
    //  console.log('DEBUG ROUTER setLang: cur/target ', curLocale, locale)
    if (curLocale !== locale)
      changeLocale(locale)
  }
  next()
}

/** langRoute is a special route to detect locales paths when typed as url, changes lag if it exists in app */
// @ts-expect-error ignored
// eslint-disable-next-line unused-imports/no-unused-vars
const langRoute: RouteRecordRaw = {
  path: `/:locale${getLocaleRegex()}?`,
  // path: '/:locale(en|nl|fr)?',
  component: {
    beforeRouteEnter: setLang,
    beforeRouteUpdate: setLang,
    render() {
      return h(resolveComponent('router-view'))
    },
  },
  children: [navbar], // we can add routes here on need
}

/** Route for dev that shows links to all pages */
// Verify links -  for recieving external verification links
const devRoute: RouteRecordRaw = {
  path: '/dev',
  component: NavBarLayout,
  redirect: { name: 'dev-link' },
  name: 'dev',
  children: [
    {
      path: 'dev-link',
      name: 'dev-link',
      props: true,
      meta: { requiresAuth: false },
      component: () => import('/@/pages/dev/DevRoutes.vue'),
    },
  ],
}

const routes: Array<RouteRecordRaw> = [
  root,
  navbar,
  dashboard,
  // Add other routes here
  // Do not add notFound here yet
]

// Conditionally include the devRoute in development mode
if (import.meta.env.MODE === 'development') {
  // Insert devRoute at a specific position if neces

  // For example, after the root route but before others
  routes.splice(1, 0, devRoute) // Inserts devRoute at index 1
}

// Ensure the notFound route is added last
routes.push(notFound)

// console.log('spaBasePath:', spaBasePath) // This should output "/id/"
const router = createRouter({
  history: createWebHistory(spaBasePath), // '/id/'
  routes,
})

router.beforeEach((to, _from, next) => {
  //  console.log('DEBUG to: ', to, 'DEBUG from: ', from)
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !getUserAuth()) {
    // this route requires auth, check if logged in
    // if not, redirect to static root page.
    // Redirect unauthenticated access of protected routes to the external static page
    // window.location.href = import.meta.env.VITE_APP_ROOT_REDIRECT_DOMAIN // <= TO EXTERNAL ROUTE
    router.push({ name: 'root' }) // <= TO ROUTE ROOT (LOGIN)
  }
  if (to.path === '/')
  // router.push('/') // this creates an endless loop
    router.push({ name: 'root' }) // this creates an endless loop
  // Redirect base route to external static page
  /*
  if (to.path === '/')
    window.location.href = appRootRedirectDomain
*/
  next()
})

async function preloadAsyncRoutes() {
  // iterate all routes and if the component is async - prefetch it!
  for (const route of router.getRoutes()) {
    if (!route.components)
      continue

    // most routes have just a "default" component unless named views are used - iterate all entries just in case
    for (const componentOrImporter of Object.values(route.components)) {
      if (typeof componentOrImporter === 'function') {
        try {
          // prefetch the component and wait until it finishes before moving to the next one
          await componentOrImporter
          // console.log(componentOrImporter);
        }
        catch (err) {
          // ignore failing requests
        }
      }
    }
  }
}

window.addEventListener('load', preloadAsyncRoutes)

export default router
