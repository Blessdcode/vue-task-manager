

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/*
  createRouter — Define your app's routes.
  ──────────────────────────────────────────
  In React Router:
    <Route path="/" element={<Home />} />

  In Vue Router:
    { path: '/', name: 'home', component: HomeView }

  Key differences:
  - Routes are defined as a plain array (not JSX)
  - Each route has a 'name' for programmatic navigation
  - You can use lazy loading with () => import('...')
*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
