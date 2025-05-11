<template>
  <div class="container">
    <h2>Recherche de recettes</h2>

    <div class="search-bar">
      <input
        type="text"
        v-model="motCle"
        placeholder="Entrez le nom d'une recette..."
      />
    </div>

    <div class="results">
      <div
        v-for="recette in resultats"
        :key="recette.id"
        class="recipe-card"
      >
        <img :src="recette.image_url" :alt="recette.nom" />
        <h3>{{ recette.title }}</h3>
        <p><strong> description : </strong>{{ recette.description }}</p>
        <p><strong> Season : </strong> {{ recette.season }}</p>
      </div>

      <p v-if="resultats.length === 0">Aucune recette trouvée.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RechercheView',
  data () {
    return {
      motCle: '',
      recettes: []
    }
  },
  computed: {
    resultats () {
      return this.recettes.filter(recette =>
        recette.title.toLowerCase().includes(this.motCle.toLowerCase())
      )
    }
  },
  methods: {
    async fetchRecipe () {
      try {
        const response = await axios.get('http://localhost:3000/api/recipe')
        this.recettes = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des recettes :', error)
      }
    }
  },
  mounted () {
    this.fetchRecipe()
  }
}
</script>

<style scoped>
.container {
  padding: 40px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

input[type='text'] {
  padding: 10px;
  flex: 1;
  font-size: large;
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.recipe-card {
  background: white;
  padding: 15px;
  width: 280px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.recipe-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
