

<script setup lang="ts">

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
