<template>
  <div class="container">
    <div class="image-side">
      <!-- você pode adicionar uma imagem aqui, igual no componente de login -->
    </div>
    <div class="login-side">
      <div class="login-container">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="logout-btn">Register</button>
        </form>
      </div>
    </div>
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
    goBack() {
      this.$router.go(-1)
    },
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
              this.$router.push('/login'); 
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
.container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.image-side {
  flex: 1;
  background: url("@/assets/logoimg.png") no-repeat center center fixed;
  background-size: cover;
}

.login-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
}

.login-container {
  width: 100%;
  max-width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.error {
  color: red;
  margin-bottom: 20px;
}

.logout-btn {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #007bff;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.logout-btn:hover {
  opacity: 0.9;
}
</style>
