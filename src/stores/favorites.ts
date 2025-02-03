import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as string[],
  }),

  actions: {
    addToFavorites(image: string) {
      this.favorites.push(image);
    },
    removeFromFavorites(index: number) {
      this.favorites.splice(index, 1);
    },
  },
});
