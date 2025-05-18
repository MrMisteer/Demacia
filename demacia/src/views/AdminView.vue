<template>
  <div class="admin-container">
    <h1>Espace Administrateur</h1>

    <!-- Tableau des utilisateurs -->
    <table v-if="users.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.fullname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="supprimerUtilisateur(user.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun utilisateur à afficher.</p>

    <!-- Tableau des jeux -->
    <h2>Liste des Jeux</h2>
    <table v-if="games.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Catégorie</th>
          <th>Durée</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jeu in games" :key="jeu.Id_jeu">
          <td>{{ jeu.Id_jeu }}</td>
          <td>{{ jeu.nom_jeu }}</td>
          <td>{{ jeu.categorie }}</td>
          <td>{{ jeu.duree_mini }} - {{ jeu.duree_max }}</td>
          <td>
            <button @click="deleteGame(jeu.Id_jeu)" class="btn-suppr">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun jeu à afficher.</p>

    <!-- Formulaire d’ajout de jeu -->
    <h2>Ajouter un jeu</h2>
    <form @submit.prevent="ajouterJeu" class="form-ajout">
      <input v-model="nouveauJeu.nom_jeu" placeholder="Nom du jeu" required />
      <input v-model="nouveauJeu.photo" placeholder="URL de l'image" required />
      <input v-model="nouveauJeu.description" placeholder="Description" required />
      <input type="number" v-model.number="nouveauJeu.annee_sortie" placeholder="Année de sortie" required />
      <input type="number" v-model.number="nouveauJeu.mini_player" placeholder="Joueurs minimum" required />
      <input type="number" v-model.number="nouveauJeu.max_player" placeholder="Joueurs maximum" required />
      <input type="time" v-model="nouveauJeu.duree_mini" placeholder="Durée minimale" required />
      <input type="time" v-model="nouveauJeu.duree_max" placeholder="Durée maximale" required />
      <input v-model="nouveauJeu.categorie" placeholder="Catégorie" required />
      <button type="submit">Ajouter le jeu</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import UserDataService from '@/services/UserDataService'

const users = ref([])
const games = ref([])
const nouveauJeu = ref({
  nom_jeu: '',
  photo: '',
  description: '',
  annee_sortie: '',
  mini_player: '',
  max_player: '',
  duree_mini: '',
  duree_max: '',
  categorie: ''
})

onMounted(() => {
  axios.get('http://localhost:8081/api/user/admin/all-users', { withCredentials: true })
    .then(res => { users.value = res.data })
    .catch(err => console.error('Accès refusé ou erreur serveur', err))

  fetchGames()
})

function supprimerUtilisateur (id) {
  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    UserDataService.deleteUser(id)
      .then(() => {
        users.value = users.value.filter(u => u.id !== id)
      })
      .catch(err => {
        console.error('Erreur lors de la suppression :', err)
      })
  }
}

function fetchGames () {
  axios.get('http://localhost:8081/api/jeu', { withCredentials: true })
    .then(res => {
      games.value = res.data.map(j => j.dataValues || j)
    })
    .catch(err => console.error('Erreur lors de la récupération des jeux', err))
}

function deleteGame (id) {
  if (confirm('Voulez-vous vraiment supprimer ce jeu ?')) {
    axios.delete(`http://localhost:8081/api/jeu/admin/delete/${id}`, { withCredentials: true })
      .then(() => {
        games.value = games.value.filter(j => j.Id_jeu !== id)
      })
      .catch(err => {
        alert('Erreur lors de la suppression')
        console.error(err)
      })
  }
}

function ajouterJeu () {
  axios.post('http://localhost:8081/api/jeu', nouveauJeu.value, { withCredentials: true })
    .then(() => {
      alert('Jeu ajouté avec succès')
      fetchGames()
      nouveauJeu.value = {
        nom_jeu: '',
        photo: '',
        description: '',
        annee_sortie: '',
        mini_player: '',
        max_player: '',
        duree_mini: '',
        duree_max: '',
        categorie: ''
      }
    })
    .catch(err => {
      console.error('Erreur lors de l’ajout du jeu :', err)
    })
}
</script>

<style scoped>
.admin-container {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
thead {
  background-color: #f4f4f4;
}
button {
  background-color: red;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: darkred;
}
.btn-suppr {
  background-color: red;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn-suppr:hover {
  background-color: darkred;
}
.form-ajout {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}
.form-ajout input,
.form-ajout button {
  padding: 10px;
}
</style>
