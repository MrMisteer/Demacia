<template>
  <div>
    <header>
      <h1>Demacia</h1>
      <nav>
        <router-link to="/" role="button">Accueil</router-link>
        <router-link to="/Catalogue" role="button">Nos Jeux</router-link>
        <router-link to="/Recherche" role="button">Recherche</router-link>
        <router-link to="/About" role="button">À propos</router-link>
        <router-link v-if="isLoggedIn" to="/Favoris">Mes Favoris</router-link>
        <router-link v-if="!isLoggedIn" to="/Login" class="btn" >
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
header {
  background: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

.btn {
  background-color: black;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
}

</style>
