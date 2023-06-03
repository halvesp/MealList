<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
  
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
  
        <p v-if="error" class="error">{{ error }}</p>
        
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        username: '',
        password: '',
        recipes: [],
        error: '',
      };
    },
    methods: {
        async handleRegister() {
            try {
                const users = await axios.get('http://localhost:3000/users', {
                    params: {
                    username: this.username,
                    },
                });
                    if (users.data.length) {
                    this.error = 'Username already exists';
                    return;
                }
                const response = await axios.post('http://localhost:3000/users', {
                    username: this.username,
                    password: this.password,
                    recipes: [],
                });
                if (response.status === 201) {
                    this.$router.push('/login'); // redirect to login page
                } else {
                    this.error = 'An error occurred';
              }
            } catch (error) {
                console.error(error);
                this.error = 'An error occurred';
            }
        },
    },
  };
  </script>
  
  <style scoped>
  .register {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .error {
    color: red;
  }
  </style>
  