/** nav-bar base layout  with lang select and dark mode switch */
const NavBarLayout = () => import('/@/layouts/navbarStyle/NavBarLayout.vue')

export const dirpath = 'navbar'

/** utility for centralizing the paths to simplify maintainance */
export const paths = {
  PlaceHolder1: 'navbar-1',
  PlaceHolder2: 'navbar-2',
// complete for other routes
}

/** utility for centralizing component paths in a single mapping file, we reduce the maintenance overhead. When a path changes, we only need to update it in one place. */
const componentMap = {
  PlaceHolder1: () => import('/@/pages/navbar/PlaceHolder1.vue'),
  PlaceHolder2: () => import('/@/pages/navbar/PlaceHolder2.vue'),
  // Additional components as necessary
}

/** MFA services routes for when user is logged-in */
export const navbar = {
  path: '/navbar', // "mfa" if using locale prefixer
  component: NavBarLayout,
  redirect: { path: paths.PlaceHolder1 },
  name: 'navbar',
  children: [
    {
      path: paths.PlaceHolder1,
      name: paths.PlaceHolder1,
      props: true,
      meta: {
        requiresAuth: import.meta.env.VITE_ROUTE_GUARD === 'true', // <= true in production
        title: 'navbar.content.page1.header',
        description: 'navbar.content.page1.description',
      },
      component: componentMap.PlaceHolder1,
    },
    {
      path: paths.PlaceHolder2,
      name: paths.PlaceHolder2,
      props: true,
      meta: {
        requiresAuth: import.meta.env.VITE_ROUTE_GUARD === 'true', // <= true in production
        title: 'navbar.content.page2.header',
        description: 'navbar.content.page2.description',
      },
      component: componentMap.PlaceHolder2,
    },
  ],
}
