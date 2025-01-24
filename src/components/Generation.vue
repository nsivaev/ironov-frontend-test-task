<template>
  <div class="generation">
    <div class="image-container">
      <div v-for="(src, name) in orderedImages" :key="name" :class="`image image--${name}`">
        <img :src="src" :alt="`Random ${name}`" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    // Глобальный импорт всех SVG файлов через import.meta.glob (vite)
    const modules = import.meta.glob('@/images/*/**.svg', { eager: true });

    // Группируем изображения по их директориям
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

    // Список директорий
    const layers = ['backgrounds', 'head', 'eyes', 'eyebrows', 'glasses', 'body', 'mouth', 'top', 'pet'];

    // Случайное изображение для каждого слоя
    const orderedImages = ref<Record<string, string>>(
      Object.fromEntries(
        layers.map((layer) => [
          layer,
          groupedImages[layer]
            ? groupedImages[layer][Math.floor(Math.random() * groupedImages[layer].length)]
            : ''
        ])
      )
    );

    return {
      orderedImages,
    };
  },
};
</script>

<style scoped>
.generation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 526px;
  height: 526px;
  position: relative;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 40px;
}

.image-container {
  background-color: #76EBC7;
  border-radius: 8px;
  overflow: hidden;
  width: 440px;
  height: 440px;
  position: relative;
}

.image {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.image--backgrounds {
  z-index: 0;
  width: 440px;
  height: 440px;
}

.image--head {
  z-index: 1;
  top: 132px;
}

.image--eyes {
  z-index: 2;
  top: 200px;
}

.image--eyebrows {
  z-index: 3;
  top: 176px;
}

.image--mouth {
  z-index: 4;
  top: 225px;
  width: 101px;
  height: 42px;

  img {
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translate(-50%);
  }
}

.image--glasses {
  z-index: 5;
  top: 194px;
}

.image--body {
  z-index: 6;
  top: 297px;
  width: 296px;
  height: 216px;

  img {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}

.image--top {
  z-index: 7;
  top: 63px;
}

.image--pet {
  position: absolute;
  top: 313px;
  left: -68px;
  z-index: 8;
  width: 290px;
  height: 184px;
  transform: rotate(-20deg);

  img {
    position: absolute;
    width: 100%;
    height: auto;
  }
}
</style>
