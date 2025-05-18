<template>
  <div class="admin-container">
    <h1>Espace Administrateur</h1>

    <!-- Utilisateurs -->
    <section>
      <h2>Utilisateurs</h2>
      <table v-if="users.length > 0" class="styled-table">
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
            <td><button @click="supprimerUtilisateur(user.id)">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun utilisateur à afficher.</p>
    </section>

    <!-- Jeux -->
    <section>
      <h2>Liste des Jeux</h2>
      <table v-if="games.length > 0" class="styled-table">
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
            <td><button @click="deleteGame(jeu.Id_jeu)" class="btn-suppr">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun jeu à afficher.</p>
    </section>

    <!-- Formulaire -->
    <section class="form-card">
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
        <button type="submit" class="btn-add">Ajouter le jeu</button>
      </form>
    </section>
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

  fetchGames()
})

function supprimerUtilisateur (id) {
  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    UserDataService.deleteUser(id)
      .then(() => {
        users.value = users.value.filter(u => u.id !== id)
      })
  }
}

function fetchGames () {
  axios.get('http://localhost:8081/api/jeu', { withCredentials: true })
    .then(res => {
      games.value = res.data.map(j => j.dataValues || j)
    })
}

function deleteGame (id) {
  if (confirm('Voulez-vous vraiment supprimer ce jeu ?')) {
    axios.delete(`http://localhost:8081/api/jeu/admin/delete/${id}`, { withCredentials: true })
      .then(() => {
        games.value = games.value.filter(j => j.Id_jeu !== id)
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
}
</script>

<style scoped>
.admin-container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}
h1, h2 {
  margin-top: 2rem;
  color: #222;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  border: 1px solid #ddd;
  background: white;
}
.styled-table th,
.styled-table td {
  border: 1px solid #eee;
  padding: 10px;
}
.styled-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
.styled-table th {
  background-color: #f0f0f0;
  text-align: left;
}

button {
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.btn-suppr {
  background-color: red;
  color: white;
  border: none;
}
.btn-suppr:hover {
  background-color: darkred;
}
.btn-add {
  background-color: #e60000;
  color: white;
  border: none;
}
.btn-add:hover {
  background-color: #a80000;
}

.form-card {
  margin-top: 3rem;
  padding: 2rem 2.5rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  margin-inline: auto;
}

.form-card h2 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.form-ajout {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-ajout input {
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #fefefe;
}

.form-ajout input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.form-ajout button {
  background-color: #e60000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s ease-in-out;
}

.form-ajout button:hover {
  background-color: #b80000;
}

</style>
