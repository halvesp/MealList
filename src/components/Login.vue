<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
  
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
  
        <p v-if="error" class="error">{{ error }}</p>
        <button><router-link :to="`/UserRegister`">Registrar</router-link></button>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserLogin',
    data() {
      return {
        username: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.get('http://localhost:3000/users', {
            params: {
              username: this.username,
              password: this.password,
            },
          });
          if (response.data.length) {
            const user = response.data[0];
            localStorage.setItem('user', JSON.stringify(user));
            this.$router.push('/'); // redirect to home page
          } else {
            this.error = 'Invalid username or password';
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
  .login {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .error {
    color: red;
  }
  </style>
  