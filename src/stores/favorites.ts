import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as string[],
  }),
  actions: {
    addFavorite(image: string) {
      if (!this.favorites.includes(image)) {
        this.favorites.push(image);
      }
    },
    removeFavorite(image: string) {
      this.favorites = this.favorites.filter((fav) => fav !== image);
    },
    isFavorite(image: string): boolean {
      return this.favorites.includes(image);
    },
  },
});
