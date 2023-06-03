<!-- MyRecipes.vue -->
<template>
    <div>
      <h2>My Recipes</h2>
      <div v-if="recipes.length === 0">
        <p>You have not created any recipes yet.</p>
      </div>
      <div v-for="(recipe, index) in recipes" :key="recipe.name">
        <h3>{{ recipe.name }}</h3>
        <p>{{ recipe.description }}</p>
        <button @click="editRecipe(index)">Edit</button>
        <button @click="deleteRecipe(index)">Delete</button>
      </div>
      <edit-recipe v-if="editing" :recipe="recipes[recipeIndex]" @update="updateRecipe" @cancel="cancelEditing"></edit-recipe>
    </div>
    <button><router-link :to="`/registerRecipe`">Criar receita</router-link></button>
  </template>
  
  <script>
  import EditRecipe from './EditRecipe.vue';
  
  export default {
    name: 'MyRecipes',
    components: {
      EditRecipe,
    },
    data() {
      return {
        recipes: [],
        editing: false,
        recipeIndex: null,
      };
    },
    methods: {
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
  