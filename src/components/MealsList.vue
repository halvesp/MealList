<template>
  <div class="container">
    <!-- Navigation Menu -->
    <nav-bar/>
    
    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search for a meal...">
      <button class="search-btn" @click="searchMeal">Search</button>
    </div>

    <!-- Meals List -->
    <div class="meal-cards">
      <div v-for="meal in meals" :key="meal.idMeal" class="meal-item">
          <h2>{{ meal.strMeal }}</h2>
          <p>{{ meal.strArea }}</p>
          <div class="meal-image-container">
            <img class="meal-image" :src="meal.strMealThumb" alt="Meal Image">
          </div>
          <router-link :to="`/meal/${meal.idMeal}`" class="view-more">Veja mais</router-link>
          <button @click="toggleFavorite(meal)" class="add-favorite-btn">
          {{ isFavorite(meal) ? 'Remove Favorite' : 'Add Favorite' }}
          </button>
          <div v-if="favoriteMessage.meal && favoriteMessage.meal.idMeal === meal.idMeal" class="favorite-message">
          {{ favoriteMessage.text }}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'
  
export default {
    name: "MealsList",
    data() {
        return {
            meals: [],
            searchTerm: "",
            favoriteMessage: { meal: null, text: '' }
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("user");
            this.$router.push("/login");
        },
        toggleFavorite(meal) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                return;
            }
            let favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
            const found = favorites.some(el => el.idMeal === meal.idMeal);
            if (!found) {
                favorites.push(meal);
                this.favoriteMessage = { meal: meal, text: 'Added to favorites!' };
            }
            else {
                favorites = favorites.filter(el => el.idMeal !== meal.idMeal);
                this.favoriteMessage = { meal: meal, text: 'Removed from favorites!' };
            }
            localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
        },
        isFavorite(meal) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                return false;
            }
            const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
            return favorites.some(el => el.idMeal === meal.idMeal);
        },
        async searchMeal() {
            if (this.searchTerm.length === 1) {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.searchTerm}`);
                this.meals = response.data.meals;
            }
            else if (this.searchTerm.length > 1) {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.searchTerm}`);
                this.meals = response.data.meals;
            }
            else {
                // Carregar receitas aleatóriamente, ou carregar nada
            }
        }
    },
    async created() {
        for (let i = 0; i < 10; i++) {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
            this.meals.push(response.data.meals[0]);
        }
    },
    components: { NavBar }
}
</script>
  
  
  <style scoped>
.favorite-message {
  color: #4caf50;
  margin-top: 5px;
}
.container{
  background-color: #f3f3f3;
}
.nav-menu {
  display: flex;
  justify-content: end;
  gap: 20px;
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
}

.nav-link {
  margin-right: 10px;
  color: #4caf50;
  text-decoration: none;
  padding: 10px;
  border: 2px solid #4caf50;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #4caf50;
  color: white;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
.search-bar input{
  padding: 10px;
}
.meal-cards {
  padding: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  justify-items: center;
}

.meal-item {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-height: 400px;  /* Or any height you consider appropriate */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  overflow: auto;
}

.meal-image-container {
  width: 100%;
  overflow: hidden;
}

.meal-image {
  width: 60%;
  margin: auto;
  height: auto;
  object-fit: cover;
}


.meal-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.logout-btn,
.search-btn,
.add-favorite-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.logout-btn:hover,
.search-btn:hover,
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
  