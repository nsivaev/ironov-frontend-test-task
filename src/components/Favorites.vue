<template>
  <div class="favorites">
    <div v-if="favorites.length === 0" class="favorites-empty">
      <p>Ваш список избранного пуст.</p>
    </div>
    <div v-else class="favorites-list">
      <div v-for="(image, index) in favorites" :key="index" class="favorite-item">
        <img :src="image" alt="Favorite Character"/>
        <button @click="removeFavorite(index)" class="trash-btn trash-btn--delete">удалить</button>
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

.trash-btn {
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

.trash-btn--delete {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;

  &:before {
    display: block;
    content: '';
    background-image: url("../assets/icons/trash.svg");
    width: 14px;
    height: 14px;
  }
}

</style>
