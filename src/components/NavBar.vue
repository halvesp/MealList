<template>
    <div class="nav-container">
      <div class="nav-menu">
        <router-link class="nav-link" :to="`/`">Home</router-link>
      </div>
      <div class="nav-menu" >
        <button class="logout-btn" @click="logout">Logout</button>
        <router-link class="nav-link" :to="`/myRecipes`">Minhas receitas</router-link>
        <router-link class="nav-link" :to="`/registerRecipe`">Criar receita</router-link>
        <router-link class="nav-link" :to="`/favoriteMeals`">Meus favoritos</router-link>
      </div>
    </div>
  </template>

<script>

export default {
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
  }
}
</script>

<style scoped>

.nav-container{
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 50px;
}
.nav-menu {
  display: flex;
  justify-content: end;
  gap: 20px;
  padding: 10px;
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
  min-height: 400px; 
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
  