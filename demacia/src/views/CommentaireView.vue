<template>
  <div class="container">
    <!-- Add error message display -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Add loading state to submit button -->
    <form @submit.prevent="ajouterCommentaire" class="form">
      <div class="form-group">
        <label for="jeu">Jeu :</label>
        <select v-model="selectedJeu" id="jeu" required>
          <option disabled value="">Sélectionnez un jeu</option>
          <option v-for="jeu in jeux" :key="jeu.Id_jeu" :value="jeu.Id_jeu">
            {{ jeu.nom_jeu }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="commentaire">Commentaire :</label>
        <textarea id="commentaire" v-model="commentaire" required maxlength="50" />
      </div>
      <div class="form-group">
        <label for="note">Note (optionnel) :</label>
        <input id="note" type="number" v-model.number="note" min="0" max="10" />
      </div>
      <button
        class="btn"
        type="submit"
        :disabled="loading || !utilisateurId || !selectedJeu || !commentaire.trim()"
      >
        {{ loading ? 'Envoi en cours...' : 'Poster le commentaire' }}
      </button>
    </form>

    <!-- Add loading state to comments section -->
    <h3 class="mt-6">Commentaires récents</h3>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="commentaires.length === 0">
      <p>Aucun commentaire pour le moment.</p>
    </div>
    <div v-else>
      <div v-for="c in commentaires" :key="c.Id_commentaire" class="comment">
        <strong>{{ getNomJeu(c.Id_jeu) }}</strong>
        <span v-if="c.Note !== null"> - Note : {{ c.Note }}/10</span>
        <p>{{ c.Contenue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import CommentaireDataService from '@/services/CommentaireDataService'
import JeuDataService from '@/services/JeuDataService'

export default {
  setup () {
    const store = useStore()
    const jeux = ref([])
    const selectedJeu = ref('')
    const commentaire = ref('')
    const note = ref(null)
    const commentaires = ref([])

    // Add error message state
    const errorMessage = ref('')
    const loading = ref(false)

    const utilisateurId = computed(() => store.getters.user ? store.getters.user.id : null)

    const getNomJeu = (idJeu) => {
      const jeu = jeux.value.find(j => j.Id_jeu === idJeu)
      return jeu ? jeu.nom_jeu : 'Jeu inconnu'
    }

    const chargerJeux = async () => {
      try {
        const res = await JeuDataService.getAll()
        jeux.value = res.data
      } catch (error) {
        console.error('Erreur lors du chargement des jeux:', error)
        // Optionnel : ajouter un message d'erreur pour l'utilisateur
      }
    }

    // Modify chargerCommentaires with better error handling
    const chargerCommentaires = async () => {
      try {
        loading.value = true
        errorMessage.value = ''
        const res = await CommentaireDataService.getAll()
        commentaires.value = res.data
      } catch (error) {
        console.error('Erreur lors du chargement des commentaires:', error)
        errorMessage.value = 'Impossible de charger les commentaires. Veuillez réessayer.'
      } finally {
        loading.value = false
      }
    }

    const ajouterCommentaire = async () => {
      try {
        if (!utilisateurId.value || !selectedJeu.value || !commentaire.value.trim()) return

        loading.value = true
        errorMessage.value = ''

        await CommentaireDataService.create({
          Contenue: commentaire.value,
          Note: note.value,
          Id_jeu: selectedJeu.value,
          Id_user: utilisateurId.value,
          Date_commentaire: new Date().toISOString().slice(0, 10)
        })

        // Reset form
        commentaire.value = ''
        note.value = null
        selectedJeu.value = ''

        await chargerCommentaires()
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error)
        errorMessage.value = 'Impossible d\'ajouter le commentaire. Veuillez réessayer.'
      } finally {
        loading.value = false
      }
    }

    onMounted(async () => {
      try {
        await Promise.all([chargerJeux(), chargerCommentaires()])
      } catch (error) {
        console.error('Erreur lors du chargement initial:', error)
      }
    })

    return {
      store,
      jeux,
      selectedJeu,
      commentaire,
      note,
      commentaires,
      errorMessage,
      loading,
      utilisateurId,
      getNomJeu,
      chargerJeux,
      chargerCommentaires,
      ajouterCommentaire
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
}
.form-group {
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  min-height: 60px;
  resize: vertical;
}
.btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
}
.comment {
  background: #f8f8f8;
  border-radius: 6px;
  padding: 10px 15px;
  margin-bottom: 10px;
}
.mt-6 {
  margin-top: 2rem;
}
.error-message {
  background-color: #ff5252;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
}
.btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>
