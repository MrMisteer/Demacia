<template>
  <div class="commentaire-container">
    <h1>Laisser un avis sur un jeu</h1>

    <label for="jeu">Choisissez un jeu :</label>
    <select v-model="selectedGame" @change="fetchComments">
      <option disabled value="">-- Choisissez --</option>
      <option v-for="jeu in jeux" :key="jeu.Id_jeu" :value="jeu.Id_jeu">
        {{ jeu.nom_jeu }}
      </option>
    </select>

    <div v-if="selectedGame">
      <h2>Commentaires pour {{ getGameName(selectedGame) }}</h2>

      <ul>
        <li v-for="comment in commentaires" :key="comment.id_commentaire">
          <strong>{{ comment.note }}/10</strong> - {{ comment.texte }}
        </li>
      </ul>

      <h3>Ajouter un commentaire</h3>
      <textarea v-model="nouveauCommentaire" placeholder="Votre avis..."></textarea>
      <input type="number" v-model.number="note" min="1" max="10" placeholder="Note" />

      <button @click="envoyerCommentaire">Envoyer</button>

      <p v-if="formError" class="error">{{ formError }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jeux = ref([])
const selectedGame = ref('')
const commentaires = ref([])
const nouveauCommentaire = ref('')
const note = ref(5)
const formError = ref('')

onMounted(() => {
  axios.get('http://localhost:8081/api/jeu')
    .then(res => {
      jeux.value = res.data.map(j => j.dataValues || j)
    })
})

function getGameName (id) {
  const jeu = jeux.value.find(j => j.Id_jeu === id)
  return jeu ? jeu.nom_jeu : ''
}

function fetchComments () {
  axios.get(`http://localhost:8081/api/commentaires/${selectedGame.value}`)
    .then(res => {
      commentaires.value = res.data
    })
}

function envoyerCommentaire () {
  if (!nouveauCommentaire.value || !note.value || !selectedGame.value) {
    formError.value = 'Veuillez remplir tous les champs.'
    return
  }

  formError.value = ''

  axios.post('http://localhost:8081/api/commentaires', {
    texte: nouveauCommentaire.value,
    note: note.value,
    Id_jeu: selectedGame.value
  }, {
    withCredentials: true
  })
    .then(() => {
      nouveauCommentaire.value = ''
      note.value = 5
      fetchComments()
    })
    .catch(() => {
      formError.value = 'Erreur lors de l’envoi. Vérifiez que vous êtes connecté.'
    })
}
</script>

<style scoped>
.commentaire-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
}
select, textarea, input {
  display: block;
  margin: 1rem 0;
  padding: 0.5rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #fff;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.error {
  color: red;
  font-weight: bold;
}
</style>
