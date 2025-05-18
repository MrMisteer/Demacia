<template>
  <div>
    <header>
      <h1>Demacia</h1>
      <nav class="navbar">
        <div class="nav-links">
          <router-link to="/" role="button">Accueil</router-link>
          <router-link to="/Catalogue" role="button">Nos Jeux</router-link>
          <router-link v-if="isLoggedIn" to="/Favoris">Mes Favoris</router-link>
          <router-link v-if="isAdmin" to="/admin">Gestion</router-link>
        </div>
        <div class="auth-buttons">
          <router-link v-if="!isLoggedIn" to="/Login" class="login btn">
            Se connecter
          </router-link>
          <button
            v-else
            class="logout btn"
            @click="logout"
          >
            Se déconnecter
          </button>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import UserDataService from './services/UserDataService'

export default {
  computed: {
    isLoggedIn () {
      return !!this.$store.getters.user
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  created () {
    UserDataService.getAuth()
      .then(response => {
        this.$store.dispatch('setUser', response.data)
      })
      .catch(error => {
        this.$store.dispatch('setUser', null)
        console.error('Erreur lors de la récupération de l’utilisateur:', error)
      })
  },
  methods: {
    logout () {
      UserDataService.logout()
        .then(() => {
          localStorage.removeItem('token')
          this.$store.dispatch('setUser', null)
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>

<style scoped>
/* Styles globaux */
header {
  background: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

/* Barre de navigation */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.navbar .logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.navbar .nav-links {
  display: flex;
  gap: 1.5rem;
}

.navbar .nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.navbar .nav-links a:hover {
  color: #007bff;
}

.navbar .auth-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar .auth-buttons .search-bar {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.navbar .auth-buttons .signup {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}

.navbar .auth-buttons .login {
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}

.navbar .auth-buttons .logout {
  background-color: #ff4d4d;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
</style>
