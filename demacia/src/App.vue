<template>
  <div>
    <!-- Barre de navigation -->
    <nav class="navbar">
      <div class="logo">Demaciaa</div>
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link v-if="isLoggedIn" to="/Profile">Profile</router-link>
        <router-link to="/Catalogue">Catalogue</router-link>
        <router-link to="/Forum">Forum</router-link>
      </div>
      <div class="auth-buttons">
        <input type="text" class="search-bar" placeholder="Search" />
        <router-link v-if="!isLoggedIn" to="/Signup" class="signup">Sign Up</router-link>
        <router-link v-if="!isLoggedIn" to="/Login" class="login">Log In</router-link>
        <button v-if="isLoggedIn" @click="logout" class="logout">Log Out</button>
      </div>
    </nav>

    <!-- Contenu principal -->
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoggedIn: false
    }
  },
  created () {
    // Vérifie dans le localStorage si l’utilisateur est connecté
    this.isLoggedIn = localStorage.getItem('utilisateurConnecte') === 'true'
  },
  methods: {
    logout () {
      localStorage.removeItem('utilisateurConnecte')
      this.isLoggedIn = false
      this.$router.push('/login')
    }
  },
  watch: {
    // Écoute les changements de route pour mettre à jour l'état de connexion
    $route () {
      this.isLoggedIn = localStorage.getItem('utilisateurConnecte') === 'true'
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
