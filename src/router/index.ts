import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('../views/Landing.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
        {
          path: 'x-ray',
          name: 'Xray',
          component: () => import('../views/XRay/index.vue'),
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('../views/History.vue'),
        },
        {
          path: 'help',
          name: 'Help',
          component: () => import('../views/Help.vue'),
        },
      ],
    },
  ],
})

export default router
