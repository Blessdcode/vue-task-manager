/* ============================================
   ROUTER — index.ts
   ============================================
   🧠 WHAT YOU'LL LEARN HERE:

   1. Vue Router setup — Defining URL → Component
      mappings (like React Router's route config)

   2. createWebHistory — Uses the browser's History API
      for clean URLs (no # in the URL)

   3. Each route maps a path to a component.
      When the user navigates to that path,
      the component renders inside <RouterView />.
   ============================================ */

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
