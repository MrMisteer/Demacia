<template>
  <div>
    <header>
      <h1>Demacia</h1>
<<<<<<< Updated upstream
      <nav class="navbar">
        <div class="nav-links">
          <router-link to="/" role="button">Accueil</router-link>
          <router-link to="/Catalogue" role="button">Nos Jeux</router-link>
          <router-link to="/About" role="button">À propos</router-link>
          <router-link v-if="isLoggedIn" to="/Favoris">Mes Favoris</router-link>
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
=======
      <nav>
        <router-link to="/" role="button">Accueil</router-link>
        <router-link to="/Catalogue" role="button">Nos Jeux</router-link>
        <router-link to="/Recherche" role="button">Recherche</router-link>
        <router-link to="/About" role="button">À propos</router-link>
        <router-link v-if="user" to="/Favoris">Mes Favoris</router-link>
        <router-link v-if="!user" to="/Login" class="btn" >
          Se connecter
        </router-link>
        <button
          v-else
          class="btn"
          @click="logout"
        >
          Se déconnecter
        </button>
      </nav>
    </header>

    <router-view
    :user = "user" />
>>>>>>> Stashed changes
  </div>
</template>

<script>
import UserDataService from './services/UserDataService'

export default {
  computed: {
    isLoggedIn () {
      return !!this.$store.getters.user
    }
  },
  created () {
<<<<<<< Updated upstream
    UserDataService.getAuth()
      .then(response => {
        this.$store.dispatch('setUser', response.data)
      })
      .catch(error => {
        this.$store.dispatch('setUser', null)
=======
    // Vérifie dans le localStorage si l’utilisateur est connecté
    UserDataService.getAuth()
      .then(response => {
        this.name = response.data.fullname
        this.$store.dispatch('user', response.data)
      })
      .catch(error => {
        this.$store.dispatch('user', null)
>>>>>>> Stashed changes
        console.error('Erreur lors de la récupération de l’utilisateur:', error)
      })
  },
  methods: {
    logout () {
<<<<<<< Updated upstream
      UserDataService.logout()
        .then(() => {
          localStorage.removeItem('token')
          this.$store.dispatch('setUser', null)
          this.$router.push({ name: 'login' })
=======
      UserDataService.getLogout()
        .then(response => {
          localStorage.removeItem('token')
          this.$store.dispatch('user', null)
          this.$router.push('login')
>>>>>>> Stashed changes
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
