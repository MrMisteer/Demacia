<template>
  <div class="container">
    <h2>Mes Favoris</h2>
    <div v-if="favoris.length === 0">
      <p>Aucune recette n'a encore été ajoutée aux favoris.</p>
    </div>
    <div class="cards" v-else>
      <div v-for="recette in favoris" :key="recette.id" class="card">
        <img :src="recette.image_url" :alt="recette.nom">
        <h3>{{ recette.nom }}</h3>
        <p>{{ recette.description }}</p>
        <p><strong>Saison :</strong> {{ recette.season }}</p>
        <p><strong>CO2 :</strong> {{ recette.carbon_footprint }}</p>
        <p><strong>Personnes :</strong> {{ recette.personnes }}</p>
        <button class="btn" @click="retirerFavori(recette.id)">Retirer des favoris</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavorisView',
  data () {
    return {
      favoris: []
    }
  },
  mounted () {
    const favorisStockes = localStorage.getItem('mesFavoris')
    this.favoris = favorisStockes ? JSON.parse(favorisStockes) : []
  },
  methods: {
    retirerFavori (id) {
      this.favoris = this.favoris.filter(recette => recette.id !== id)
      localStorage.setItem('mesFavoris', JSON.stringify(this.favoris))
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
  font-size: 1rem;

}
</style>
