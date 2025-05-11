<template>
  <div class="container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" class="btn">Se connecter</button>
    </form>
    <p>Pas de compte ? <router-link to="/register">Inscrivez-vous ici</router-link>.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin () {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password
        })

        const data = response.data

        if (data.token) {
          localStorage.setItem('utilisateurConnecte', 'true')
          localStorage.setItem('token', data.token)
          this.$router.push('/')
        } else {
          alert('Email ou mot de passe incorrect')
        }
      } catch (error) {
        console.error('Erreur lors de la connexion vue:', error)
        alert('Une erreur est survenue. Veuillez réessayer.')
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40px;
}

form {
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin: 10px 0 5px;
}

input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.btn {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
}
</style>
