<template>
  <div>
    <!-- Navigation Menu -->
    <nav-bar/>

    <div class="favorites-container">
      <h2>Favorite Meals</h2>
      <div v-for="meal in favoriteMeals" :key="meal.idMeal" class="meal-item">
        <h3>{{ meal.strMeal }}</h3>
        <p>{{ meal.strArea }}</p>
        <img :src="meal.strMealThumb" alt="Meal Image" class="meal-img">
        <button @click="toggleFavorite(meal)" class="remove-favorite-btn">Remove from Favorites</button>
        <router-link :to="`/meal/${meal.idMeal}`" class="view-more">View More</router-link>
      </div>
      <div v-if="favoriteMeals.length === 0">
        <p>No favorite meals yet.</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import NavBar from './NavBar.vue'
  export default {
    name: "FavoriteMeals",
    data() {
      return {
        favoriteMeals: [],
        username: '',
      };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        logout() {
            localStorage.removeItem("user");
            this.$router.push("/login");
        },
        toggleFavorite(meal) {
        let favorites = JSON.parse(localStorage.getItem(`favorites_${this.username}`)) || [];
        const updatedFavorites = favorites.filter(el => el.idMeal !== meal.idMeal);
        localStorage.setItem(`favorites_${this.username}`, JSON.stringify(updatedFavorites));
        this.favoriteMeals = updatedFavorites;
      },
    },
    created() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.username = user.username;
        this.favoriteMeals = JSON.parse(localStorage.getItem(`favorites_${this.username}`)) || [];
      }
    },
    components: { NavBar }
};
  </script>
  <style scoped>
  /* ... previous styles ... */
  .nav-menu {
  display: flex;
  justify-content: end;
  gap: 20px;
  background-color: #f0f0f0;
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

.nav-link:hover {
  background-color: #45a049;
}

.logout-btn {
  background-color: #f44336;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
.new-recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.new-recipe-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

  .favorites-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
    padding: 20px;
    max-width: 600px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .meal-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .meal-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .meal-img {
    width: 100%;
    max-width: 300px;
    height: auto;
    object-fit: cover;
  }
  
  .remove-favorite-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  .remove-favorite-btn:hover {
    background-color: #d32f2f;
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
  
  /* ... rest of the styles ... */
  </style>