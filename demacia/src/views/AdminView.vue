<template>
  <div class="admin-container">
    <h1>Espace Administrateur</h1>
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
            <button @click="supprimerUtilisateur(user.id)">🗑️ Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun utilisateur à afficher.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import UserDataService from '@/services/UserDataService'

const users = ref([])

onMounted(() => {
  axios.get('http://localhost:8081/api/user/admin/all-users', {
    withCredentials: true
  })
    .then(res => {
      users.value = res.data
    })
    .catch(err => {
      console.error('Accès refusé ou erreur serveur', err)
    })
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
</style>
