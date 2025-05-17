<template>
  <div class="container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <label for="nom">Nom :</label>
      <input type="text" id="nom" v-model="users.fullname" required />

      <label for="email">Email :</label>
      <input type="email" id="email" v-model="users.email" required />

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="users.password" required />

      <button type="submit" class="btn">S'inscrire</button>
    </form>
    <p>Déjà inscrit ? <router-link to="/login">Connectez-vous ici</router-link>.</p>
  </div>
</template>

<script>

import UserDataService from '@/services/UserDataService'

export default {
  name: 'RegisterView',
  data () {
    return {
      users: {
        fullname: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    saveUser () {
      UserDataService.create(this.users)
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'LoginView' })
        })
        .catch(e => {
          console.log(e)
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
