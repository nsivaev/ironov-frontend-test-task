<template>
  <main>
    <div class="container">
      <h1>Страница избранного</h1>
      <Favorites/>
    </div>
  </main>
</template>

<script lang="ts">
import Favorites from "@/components/Favorites.vue";

export default {
  components: {Favorites},

  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
