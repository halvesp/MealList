<template>
   <nav-bar/>
  <div class="meal-detail">
    <div>
      <h2 class="meal-name">{{ meal.strMeal }}</h2>
      <p class="meal-instructions">{{ meal.strInstructions }}</p>
      <li class="meal-ingredients">{{ meal.strIngredient1 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient2 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient3 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient4 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient5 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient6 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient7 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient8 }}</li>
      <li class="meal-ingredients">{{ meal.strIngredient9 }}</li>
    </div>
    <img :src="meal.strMealThumb" alt="Meal Image" class="meal-image">
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'

export default {
    name: "MealDetail",
    data() {
        return {
            meal: {}
        };
    },
    async created() {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.$route.params.id}`);
        this.meal = response.data.meals[0];
    },
    components: { NavBar }
}
</script>

<style scoped>
.meal-detail {
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}
.meal-instructions{
  padding: 30px;
  font-weight: 600;
}
.meal-name{
  font-size: xx-large;
  text-decoration: #4caf50;
  padding: 10px;
}

.meal-image {
  width: 100%;
  height: auto;
}
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

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.meal-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-items: center;
}

.meal-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-height: 400px;  /* Or any height you consider appropriate */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  overflow: auto;
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
