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
        :key="jeu.Id_jeu"
        class="card"
      >
        <img
          :src="jeu.Photo"
          :alt="jeu.Nom_jeu"
          @error="$event.target.src = '/defaut.jpg'"
        />
        <h3>{{ jeu.Nom_jeu || 'Sans titre' }}</h3>
        <p>{{ jeu.Description || 'Aucune description disponible' }}</p>
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
        (jeu.Nom_jeu && jeu.Nom_jeu.toLowerCase().includes(rechercheMin)) ||
        (jeu.Description && jeu.Description.toLowerCase().includes(rechercheMin))
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
          alert(`Jeu "${jeu.Nom_jeu}" ajouté à vos favoris ✅`)
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
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to bottom, #ffffff, #f3f4f6);
  min-height: 100vh;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.search-bar {
  width: 100%;
  max-width: 450px;
  padding: 12px 15px;
  margin-bottom: 30px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #f9fafb;
  transition: border-color 0.2s ease;
}

.search-bar:focus {
  border-color: #6366f1;
  outline: none;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.card {
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.card p {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 8px 0;
  flex-grow: 1;
}

.btn {
  background: #111827;
  color: white;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #1f2937;
}

.btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
}

.error {
  color: #b91c1c;
  background-color: #fee2e2;
  border-radius: 6px;
  margin: 30px 0;
}

</style>
