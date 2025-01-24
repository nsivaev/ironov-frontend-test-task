<template>
  <div class="favorites">
    <div v-if="favorites.length === 0" class="favorites-empty">
      <p>Ваш список избранного пуст.</p>
    </div>
    <div v-else class="favorites-list">
      <div v-for="(image, index) in favorites" :key="index" class="favorite-item">
        <img :src="image" alt="Favorite Character"/>
        <div class="favorite-buttons">
          <a :href="image" :download="`LegoFace-${index + 1}.png`"
             class="favorite-btn favorite-btn--save">
            скачать
          </a>
          <button @click="removeFavorite(index)" class="favorite-btn favorite-btn--trash">удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useFavoritesStore} from '@/stores/favorites';

export default defineComponent({
  setup() {
    const favoritesStore = useFavoritesStore();

    const removeFavorite = (index: number) => {
      favoritesStore.removeFromFavorites(index);
    };

    return {
      favorites: favoritesStore.favorites,
      removeFavorite,
    };
  },
});
</script>

<style scoped>
.favorites {
  width: fit-content;
  border: 3px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 40px;
}

.favorites-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 45px;
}

.favorite-item {
  position: relative;

  img {
    width: 220px;
    height: 220px;
    object-fit: cover;
  }
}

.favorite-buttons {
  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
}

.favorite-btn {
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #000000;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
}

.favorite-btn--trash {

  &:before {
    display: block;
    content: '';
    background-image: url("../assets/icons/trash.svg");
    width: 14px;
    height: 14px;
  }
}

.favorite-btn--save {
  text-decoration: none;
  background-color: #FD4820;
  border: 1px solid #FD4820;
}

</style>
