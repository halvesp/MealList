<template>
  <nav-bar/>
  <div class="new-recipe-container">
    
    <div class="new-recipe-container">
      <h2>Create a new Recipe</h2>
      <form @submit.prevent="handleNewRecipe" class="new-recipe-form">
        <label for="name">Recipe Name</label>
        <input type="text" id="name" v-model="name" required class="form-input">

        <label for="description">Recipe Description</label>
        <textarea id="description" v-model="description" required class="form-input"></textarea>

        <button type="submit" class="submit-btn">Create Recipe</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
    <button class="my-recipes-btn"><router-link :to="`/myRecipes`">Ver minhas receitas</router-link></button>
  </div>
</template>

  
  <script>
  import axios from 'axios';
import NavBar from './NavBar.vue';
  
  export default {
    name: "NewRecipe",
    data() {
        return {
            name: "",
            description: "",
            message: "",
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
        async handleNewRecipe() {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) {
                    this.message = "You must be logged in to create a recipe";
                    return;
                }
                const newRecipe = {
                    name: this.name,
                    description: this.description,
                };
                const response = await axios.patch(`http://localhost:3000/users/${user.id}`, {
                    recipes: [...user.recipes, newRecipe],
                });
                if (response.status === 200) {
                    this.message = "Recipe created successfully";
                    // update user's recipe list in local storage
                    user.recipes.push(newRecipe);
                    localStorage.setItem("user", JSON.stringify(user));
                }
                else {
                    this.message = "An error occurred";
                }
            }
            catch (error) {
                console.error(error);
                this.message = "An error occurred";
            }
        },
    },
    components: { NavBar }
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

.form-input {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

.message {
  margin-top: 20px;
  color: green;
}

.my-recipes-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin: 20px auto;
  display: block;
}

.my-recipes-btn:hover {
  background-color: #45a049;
}
</style>