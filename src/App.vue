<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <nav>
        <RouterLink to="/">Генерация</RouterLink>
        <RouterLink to="/favorites">Избранное</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView/>
</template>

<style scoped>
nav {
  margin-block: 20px;
  display: flex;
  justify-content: end;
  gap: 15px;
}
</style>
