<!-- EditRecipe.vue -->
<template>
    <div>
      <h2>Edit Recipe</h2>
      <form @submit.prevent="$emit('update', { name, description })">
        <label for="name">Recipe Name</label>
        <input type="text" id="name" v-model="name">
  
        <label for="description">Recipe Description</label>
        <textarea id="description" v-model="description"></textarea>
  
        <button type="submit">Update Recipe</button>
        <button type="button" @click="$emit('cancel')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditRecipe',
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        name: this.recipe.name,
        description: this.recipe.description,
      };
    },
  };
  </script>
  