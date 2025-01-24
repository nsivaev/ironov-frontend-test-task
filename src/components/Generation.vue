<template>
  <div class="generation">
    <div class="random-images">
      <div v-for="(src, name) in randomImages" :key="name" class="image-container">
        <p>{{ name }}</p>
        <img :src="src" :alt="`Random ${name}`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const modules = import.meta.glob('@/images/*/**.svg', { eager: true });

    const groupedImages: Record<string, string[]> = {};

    Object.entries(modules).forEach(([path, module]: [string, any]) => {
      const match = path.match(/\/images\/([^/]+)\//);
      if (match) {
        const dir = match[1];
        if (!groupedImages[dir]) {
          groupedImages[dir] = [];
        }
        groupedImages[dir].push(module.default || module);
      }
    });

    const randomImages = ref<Record<string, string>>(
      Object.fromEntries(
        Object.entries(groupedImages).map(([dir, images]) => [
          dir,
          images[Math.floor(Math.random() * images.length)],
        ])
      )
    );

    return {
      randomImages,
    };
  },
};
</script>

<style scoped>
.generation {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #FFFFFF;
  border-radius: 8px;
  width: 480px;
  padding: 20px;
}

.random-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.image-container {
  text-align: center;
  border: 2px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  max-width: 100%;
  max-height: 100%;
  margin-top: 10px;
}
</style>
