/** dashboard base layout  with lang select and dark mode switch */
const DashBoardLayout = () => import('/@/layouts/dashboard/DashBoardLayout.vue')

export const dirpath = 'dashboard'

/** utility for centralizing the paths to simplify maintainance */
export const paths = {
  PlaceHolder1: 'dashboard-1',
  PlaceHolder2: 'dashboard-2',
// complete for other routes
}

/** utility for centralizing component paths in a single mapping file, we reduce the maintenance overhead. When a path changes, we only need to update it in one place. */
const componentMap = {
  PlaceHolder1: () => import('/@/pages/dashboard/PlaceHolder1.vue'),
  PlaceHolder2: () => import('/@/pages/dashboard/PlaceHolder2.vue'),
  // Additional components as necessary
}

/** MFA services routes for when user is logged-in */
export const dashboard = {
  path: '/dashboard', // "mfa" if using locale prefixer
  component: DashBoardLayout,
  redirect: { path: paths.PlaceHolder1 },
  name: 'dashboard',
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
