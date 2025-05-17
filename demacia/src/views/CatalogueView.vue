<template>
  <div class="container">
    <h2>Nos Jeux</h2>

    <!-- Barre de recherche -->
    <input
      v-model="recherche"
      type="text"
      placeholder="Rechercher un jeu..."
      class="search-bar"
    />

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
        v-for="jeu in jeuxFiltres"
        :key="jeu.id"
        class="card"
      >
        <img
          :src="jeu.photo"
          :alt="jeu.nom_jeu"
          @error="$event.target.src = '/defaut.jpg'"
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
import FavorisDataService from '@/services/FavorisDataService'

export default {
  name: 'CatalogueView',
  data () {
    return {
      jeux: [],
      loading: false,
      error: null,
      recherche: ''
    }
  },
  computed: {
    jeuxFiltres () {
      if (!this.recherche) return this.jeux
      const rechercheMin = this.recherche.toLowerCase()
      return this.jeux.filter(jeu =>
        (jeu.nom_jeu && jeu.nom_jeu.toLowerCase().includes(rechercheMin)) ||
        (jeu.description && jeu.description.toLowerCase().includes(rechercheMin))
      )
    },
    utilisateurConnecte () {
      // Utilise Vuex pour vérifier la connexion
      return !!this.$store.getters.user
    },
    utilisateurId () {
      return this.$store.getters.user ? this.$store.getters.user.id : null
    }
  },
  mounted () {
    this.retrieveJeux()
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
      // Prépare les données à envoyer à l'API, avec Id_user
      const data = {
        Id_jeu: jeu.Id_jeu,
        Id_user: this.utilisateurId, // Ajout de l'utilisateur connecté
        Date_ajout: new Date().toISOString().slice(0, 10) // format YYYY-MM-DD
      }
      FavorisDataService.create(data)
        .then(() => {
          alert(`Jeu "${jeu.nom_jeu}" ajouté à vos favoris ✅`)
        })
        .catch(() => {
          alert('Erreur lors de l\'ajout aux favoris (déjà ajouté ?)')
        })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40px;
}

.search-bar {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 25px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
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
