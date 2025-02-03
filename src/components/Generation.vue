<template>
  <div class="generation">
    <div ref="imageContainer" class="image-container">
      <div v-for="(src, name) in orderedImages" :key="name" :class="`image image--${name}`">
        <img :src="src" :alt="`Random ${name}`" loading="lazy"/>
      </div>
    </div>
    <div class="generation-buttons">
      <button @click="regenerateImages" class="generation-btn generation-btn--refresh">
        обновить
      </button>
      <button @click="downloadImage" class="generation-btn generation-btn--download">
        скачать
      </button>
      <button @click="saveToFavorites" class="generation-btn generation-btn--favorite">в избранное
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';

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

    const layers = ['backgrounds', 'head', 'eyes', 'eyebrows', 'glasses', 'body', 'mouth', 'top', 'pet'];
    const orderedImages = ref<Record<string, string>>(generateRandomImages());

    const imageContainer = ref<HTMLElement | null>(null);
    const favoritesStore = useFavoritesStore();

    // Генерация случайных изображений
    function generateRandomImages() {
      return Object.fromEntries(
        layers.map((layer) => [
          layer,
          groupedImages[layer]
            ? groupedImages[layer][Math.floor(Math.random() * groupedImages[layer].length)]
            : '',
        ])
      );
    }

    // Метод для обновления генерации
    const regenerateImages = () => {
      orderedImages.value = generateRandomImages();
    };

    // Сохранение в избранное
    const saveToFavorites = () => {
      if (!imageContainer.value) return;

      import('html2canvas').then((html2canvas) => {
        html2canvas.default(imageContainer.value as HTMLElement, {
          backgroundColor: null,
        }).then((canvas) => {
          const dataURL = canvas.toDataURL('image/png');
          favoritesStore.addToFavorites(dataURL);
        });
      });
      alert('Добавлено в избранное ✏️');
    };

    // Скачать пикчу
    const downloadImage = () => {
      if (!imageContainer.value) return;

      import('html2canvas').then((html2canvas) => {
        html2canvas.default(imageContainer.value as HTMLElement, {
          backgroundColor: null,
        }).then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'LegoFace.png';
          link.click();
        });
      });
    };

    return {
      orderedImages,
      imageContainer,
      regenerateImages,
      saveToFavorites,
      downloadImage,
    };
  },
};
</script>

<style scoped>
.generation {
  margin-inline: auto;
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
  width: 440px;
  height: 440px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
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

.generation-buttons {
  display: flex;
  gap: 12px;
  position: absolute;
  bottom: 60px;
  z-index: 123;
}

.generation-btn {
  cursor: pointer;
  color: #FFFFFF;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
}

.generation-btn--refresh {
  background-color: #FD4820;
  border: 1px solid #FD4820;
  transition: 0.2s ease;

  &:hover {
    background-color: #ff5b36;
    border: 1px solid #ff5b36;
  }

  &:active {
    background-color: #FD4820;
    border: 1px solid #FD4820;
  }

  &:before {
    display: block;
    content: '';
    background-image: url("../assets/icons/reload.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 14px;
    height: 14px;
  }

  &:hover:before {
    animation: rotate360 0.3s ease;
  }
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.generation-btn--download {
  flex-direction: row-reverse;
  background-color: #000000;
  border: 1px solid #FFFFFF;
  transition: 0.2s ease;

  &:hover {
    background-color: #252525;
  }

  &:active {
    background-color: #191919;
  }
}

.generation-btn--favorite {
  flex-direction: row-reverse;
  background-color: #000000;
  border: 1px solid #FFFFFF;
  transition: 0.2s ease;

  &:before {
    display: block;
    content: '';
    background-image: url("../assets/icons/like.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: #252525;
  }

  &:active {
    background-color: #191919;
  }
}
</style>
