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
          path: 'diagnosis/:id',
          name: 'Diagnosis',
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
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/index.vue'),
    },
  ],
})

export default router
