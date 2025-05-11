<template>
  <div class="container">
    <h2>Nos Jeux</h2>

    <!-- État de chargement -->
    <div v-if="loading" class="loading">
      Chargement des jeux...
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- Liste des jeux -->
    <div v-else class="cards">
      <div
        v-for="jeu in jeux"
        :key="jeu.id"
        class="card"
      >
        <img
          :src="jeu.photo"
          :alt="jeu.nom_jeu"
          @error="$event.target.src = 'chemin/vers/image/par/defaut.jpg'"
        />
        <h3>{{ jeu.nom_jeu || 'Sans titre' }}</h3>
        <p>{{ jeu.description || 'Aucune description disponible' }}</p>
        <button
          class="btn"
          @click="ajouterFavori(jeu)"
          :disabled="!utilisateurConnecte"
        >
          Ajouter aux favoris
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JeuDataService from '@/services/JeuDataService'

export default {
  name: 'CatalogueView',
  data () {
    return {
      utilisateurConnecte: false,
      jeux: [],
      loading: false,
      error: null
    }
  },
  mounted () {
    this.retrieveJeux()
    this.utilisateurConnecte = localStorage.getItem('utilisateurConnecte') === 'true'
  },
  methods: {
    async retrieveJeux () {
      this.loading = true
      this.error = null
      try {
        const response = await JeuDataService.getAll()
        if (response.data) {
          console.log('Jeux récupérés:', response.data)
          this.jeux = response.data
        }
      } catch (error) {
        console.error('Erreur lors du chargement des jeux:', error)
        this.error = 'Impossible de charger les jeux'
      } finally {
        this.loading = false
      }
    },
    ajouterFavori (jeu) {
      if (!this.utilisateurConnecte) {
        alert('Vous devez être connecté pour ajouter aux favoris.')
        return
      }
      const favorisActuels = JSON.parse(localStorage.getItem('mesFavoris')) || []
      const existeDeja = favorisActuels.some(j => j.id === jeu.id)
      if (!existeDeja) {
        favorisActuels.push(jeu)
        localStorage.setItem('mesFavoris', JSON.stringify(favorisActuels))
        alert(`Jeu "${jeu.nom}" ajouté à vos favoris ✅`)
      } else {
        alert('Ce jeu est déjà dans vos favoris.')
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40px;
}

.cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 280px;
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.btn {
  background: black;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  font-size: 1.2rem;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 4px;
  margin: 20px 0;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
