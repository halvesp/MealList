<!-- MyRecipes.vue -->
<template>
  <div>
    <nav-bar/>

    <h2>My Recipes</h2>
    <div v-if="recipes.length === 0">
      <p>You have not created any recipes yet.</p>
    </div>
    <div class="meal-cards">
      <div class="meal-item" v-for="(recipe, index) in recipes" :key="recipe.name">
        <h3>{{ recipe.name }}</h3>
        <p>{{ recipe.description }}</p>
        <button class="logout-btn" @click="editRecipe(index)">Edit</button>
        <button class="logout-btn" @click="deleteRecipe(index)">Delete</button>
      </div>
    </div>
    <edit-recipe v-if="editing" :recipe="recipes[recipeIndex]" @update="updateRecipe" @cancel="cancelEditing"></edit-recipe>
    <button class="logout-btn"><router-link :to="`/registerRecipe`">Create Recipe</router-link></button>
  </div>
</template>

  
  <script>
  import EditRecipe from './EditRecipe.vue';
  import NavBar from './NavBar.vue';
  
  export default {
    name: 'MyRecipes',
    components: {
    EditRecipe,
    NavBar
},
    data() {
      return {
        recipes: [],
        editing: false,
        recipeIndex: null,
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1)
    },
      editRecipe(index) {
        this.editing = true;
        this.recipeIndex = index;
      },
      deleteRecipe(index) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.recipes.splice(index, 1);
        localStorage.setItem('user', JSON.stringify(user));
        this.recipes.splice(index, 1);
      },
      updateRecipe(recipe) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.recipes[this.recipeIndex] = recipe;
        localStorage.setItem('user', JSON.stringify(user));
        this.recipes[this.recipeIndex] = recipe;
        this.editing = false;
      },
      cancelEditing() {
        this.editing = false;
      },
    },
    created() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.recipes) {
        this.recipes = user.recipes;
      }
    },
  };
  </script>

<style scoped>
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

.meal-image-container {
  width: 100%;
  overflow: hidden;
}

.meal-image {
  width: 100%;
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
  