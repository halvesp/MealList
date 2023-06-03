<template>
    <div>
      <h2>Create a new Recipe</h2>
      <form @submit.prevent="handleNewRecipe">
        <label for="name">Recipe Name</label>
        <input type="text" id="name" v-model="name" required>
  
        <label for="description">Recipe Description</label>
        <textarea id="description" v-model="description" required></textarea>
  
        <button type="submit">Create Recipe</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
    <button><router-link :to="`/myRecipes`">Ver minhas receitas</router-link></button>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NewRecipe',
    data() {
      return {
        name: '',
        description: '',
        message: '',
      };
    },
    methods: {
        async handleNewRecipe() {
            try {
                // get current user
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                this.message = 'You must be logged in to create a recipe';
                return;
            }
                const newRecipe = {
                name: this.name,
                description: this.description,
            };
                // add new recipe to user's recipe list on the server
                const response = await axios.patch(`http://localhost:3000/users/${user.id}`, {
                recipes: [...user.recipes, newRecipe],
            });
                if (response.status === 200) {
                this.message = 'Recipe created successfully';
                // update user's recipe list in local storage
                user.recipes.push(newRecipe);
                localStorage.setItem('user', JSON.stringify(user));
                } else {
                this.message = 'An error occurred';
            }
        } catch (error) {
                console.error(error);
                this.message = 'An error occurred';
        }
      },

    },
  };
  </script>
  