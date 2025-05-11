<template>
  <div class="container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <label for="nom">Nom :</label>
      <input type="text" id="nom" v-model="nom" required />

      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" class="btn">S'inscrire</button>
    </form>
    <p>Déjà inscrit ? <router-link to="/login">Connectez-vous ici</router-link>.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterView',
  data () {
    return {
      nom: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleRegister () {
      try {
        const utilisateur = {
          nom: this.nom,
          email: this.email,
          password: this.password
        }

        const response = await axios.post('http://localhost:3000/api/register', utilisateur)

        if (response.status === 201) {
          alert('Inscription réussie !')
          this.$router.push('/login')
        } else {
          alert("Erreur lors de l'inscription. Veuillez réessayer.")
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error)
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
  max-width: 400px;
  margin: auto;
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
