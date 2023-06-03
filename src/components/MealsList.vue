<template>
    <div>
      <input type="text" v-model="searchTerm" placeholder="Search for a meal...">
      <button class="logout-btn" @click="logout">Logout</button>
      <button class="search-btn" @click="searchMeal">Search</button>
      <button class="my-recipes-btn"><router-link :to="`/myRecipes`">Minhas receitas</router-link></button>
      <button class="create-recipe-btn"><router-link :to="`/registerRecipe`">Criar receita</router-link></button>
      <div class="meal-cards">
        <div v-for="meal in meals" :key="meal.idMeal" class="meal-item">
            <button class="favorites-btn"><router-link :to="`/favoriteMeals`">Meus favoritos</router-link></button>
            <h2>{{ meal.strMeal }}</h2>
            <p>{{ meal.strArea }}</p>
            <img :src="meal.strMealThumb" alt="Meal Image">
            <router-link :to="`/meal/${meal.idMeal}`" class="view-more">View More</router-link>
            <button @click="toggleFavorite(meal)" class="add-favorite-btn">
            {{ isFavorite(meal) ? 'Remove Favorite' : 'Add Favorite' }}
            </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'MealsList',
    data() {
      return {
        meals: [],
        searchTerm: ''
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('user')
        this.$router.push('/login')
      },
      toggleFavorite(meal) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
          return
        }
        let favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || []
        const found = favorites.some(el => el.idMeal === meal.idMeal)
        if (!found) {
          favorites.push(meal)
        } else {
          favorites = favorites.filter(el => el.idMeal !== meal.idMeal)
        }
        localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites))
      },
      isFavorite(meal) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
          return false
        }
        const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || []
        return favorites.some(el => el.idMeal === meal.idMeal)
      },
      async searchMeal() {
        if (this.searchTerm.length === 1) {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.searchTerm}`)
          this.meals = response.data.meals
        } else if (this.searchTerm.length > 1) {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.searchTerm}`)
          this.meals = response.data.meals
        } else {
          // Load random meals or do nothing
        }
      }
    },
    async created() {
      for (let i = 0; i < 10; i++) {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        this.meals.push(response.data.meals[0])
      }
    }
  }
  </script>
  
  <style scoped>
  .meal-cards{
    display: grid;
  }
  .meal-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  .meal-container {
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-items: center;
}
  
  .meal-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .logout-btn,
  .search-btn,
  .my-recipes-btn,
  .create-recipe-btn,
  .favorites-btn,
  .add-favorite-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .logout-btn:hover,
  .search-btn:hover,
  .my-recipes-btn:hover,
  .create-recipe-btn:hover,
  .favorites-btn:hover,
  .add-favorite-btn:hover {
    background-color: #45a049;
  }
  
  .view-more {
    color: #2196f3;
    margin-bottom: 10px;
    text-decoration: underline;
  }
  
  .view-more:hover {
    color: #1976d2;
    text-decoration: none;
  }
  </style>
  