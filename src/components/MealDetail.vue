<template>
  <div class="meal-detail">
    <h2>{{ meal.strMeal }}</h2>
    <p>{{ meal.strInstructions }}</p>
    <img :src="meal.strMealThumb" alt="Meal Image" class="meal-image">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MealDetail',
  data() {
    return {
      meal: {}
    }
  },
  async created() {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.$route.params.id}`)
    this.meal = response.data.meals[0]
  }
}
</script>

<style scoped>
.meal-detail {
  width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.meal-image {
  width: 100%;
  height: auto;
}
</style>
