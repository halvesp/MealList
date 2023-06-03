<template>
    <div>
      <h2>Favorite Meals</h2>
      <div v-for="meal in favoriteMeals" :key="meal.idMeal">
        <h3>{{ meal.strMeal }}</h3>
        <p>{{ meal.strArea }}</p>
        <img :src="meal.strMealThumb" alt="Meal Image">
        <button @click="toggleFavorite(meal)">Remove from Favorites</button>
        <router-link :to="`/meal/${meal.idMeal}`">View More</router-link>
      </div>
      <div v-if="favoriteMeals.length === 0">
        <p>No favorite meals yet.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FavoriteMeals',
    data() {
      return {
        favoriteMeals: [],
      };
    },
    methods: {
      toggleFavorite(meal) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = favorites.filter(el => el.idMeal !== meal.idMeal);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        this.favoriteMeals = updatedFavorites;
      },
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.favoriteMeals = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
            }
        },
  };
  </script>
  