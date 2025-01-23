<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Генерация</RouterLink>
        <RouterLink to="/favorites">Избранное</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
  nav {
    margin-bottom: 20px;
    display: flex;
    gap: 15px;
  }
</style>
