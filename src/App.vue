<!-- ============================================
     APP SHELL — App.vue
     ============================================
     🧠 WHAT YOU'LL LEARN HERE:

     1. <RouterView> — Vue Router's outlet component
        (like React Router's <Outlet />)

     2. App.vue is the ROOT component. Every Vue app
        has exactly one. It wraps everything.

     3. main.ts creates the app, registers plugins
        (like the router), and mounts it to the DOM.
     ============================================ -->

<script setup lang="ts">
/*
  We import RouterView from vue-router.
  ──────────────────────────────────────
  RouterView is where the matched route component
  gets rendered. When the URL changes, Vue Router
  swaps the component inside <RouterView />.

  Think of it like React Router's <Outlet />.
*/
import { RouterView } from 'vue-router'
</script>

<template>
  <!--
    <RouterView /> — The router outlet.
    ─────────────────────────────────────
    This is where the current route's component appears.

    When the URL is "/", it renders HomeView (TaskManager).
    If you added more routes, they'd render here too.

    Our entire app is wrapped in this simple shell.
    The <main> tag gives us semantic HTML + a styling hook.
  -->
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
}
</style>
