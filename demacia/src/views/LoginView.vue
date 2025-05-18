<template>
  <div class="container">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <label for="email">Email :</label>
      <input type="email" id="email" v-model="user.email" required />

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="user.password" required />

      <button type="submit" class="btn">Se connecter</button>
    </form>
    <p>Pas de compte ? <router-link to="/register">Inscrivez-vous ici</router-link>.</p>
  </div>
</template>

<script>
import UserDataService from '@/services/UserDataService'

export default {
  name: 'LoginView',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }

    }
  },
  methods: {
    login () {
      UserDataService.login(this.user)
        .then(response => {
          console.log('✅ Connexion réussie', response.data)
          const user = response.data.user
          const token = response.data.token

          // Stockage dans localStorage
          localStorage.setItem('user', JSON.stringify({ ...user, token }))

          // Optionnel : Vuex si tu veux
          this.$store.dispatch('setUser', user)

          // Redirection selon rôle
          if (user.role === 'admin') {
            this.$router.push({ name: 'Admin' }) // vers AdminView.vue
          } else {
            this.$router.push({ name: 'Accueil' }) // vers AccueilView.vue
          }
        })
        .catch(e => {
          console.error('❌ Erreur détectée dans le login :', e.response?.status)
          console.error('Détails :', e.response?.data || e.message)
          alert('Erreur de connexion')
        })
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
