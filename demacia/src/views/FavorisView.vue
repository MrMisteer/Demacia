<template>
  <div class="container">
    <h2>Mes Favoris</h2>
    <div v-if="favoris.length === 0">
      <p>Aucun favori n'a encore été ajouté.</p>
    </div>
    <div class="cards" v-else>
      <div v-for="favori in favoris" :key="favori.Id_favoris" class="card">
        <img :src="favori.photo" :alt="favori.nom_jeu">
        <h3>{{ favori.nom_jeu }}</h3>
        <p>{{ favori.description }}</p>
        <p><strong>Date d'ajout :</strong> {{ favori.dateAjoutLisible }}</p>
        <button class="btn" @click="retirerFavori(favori.Id_favoris)">Retirer des favoris</button>
      </div>
    </div>
  </div>
</template>

<script>
import FavorisDataService from '@/services/FavorisDataService'
import JeuDataService from '@/services/JeuDataService'

export default {
  name: 'FavorisView',
  data () {
    return {
      favoris: []
    }
  },
  computed: {
    utilisateurId () {
      console.log('utilisateurId', this.$store.getters.user)
      return this.$store.getters.user ? this.$store.getters.user.id : null
    }
  },
  async mounted () {
    if (!this.utilisateurId) {
      this.favoris = []
      return
    }
    // Récupère les favoris de l'utilisateur connecté
    const response = await FavorisDataService.getAllByUser(this.utilisateurId)
    // Pour chaque favori, récupère les infos du jeu associé
    const favorisAvecJeux = await Promise.all(
      response.data.map(async favori => {
        const jeu = await JeuDataService.get(favori.Id_jeu)
        // Formatage de la date d'ajout
        const date = new Date(favori.Date_ajout)
        const dateAjoutLisible = date.toLocaleDateString('fr-FR')
        return {
          ...favori,
          nom_jeu: jeu.data.Nom_jeu,
          photo: jeu.data.Photo,
          description: jeu.data.Description,
          dateAjoutLisible // nouvelle propriété formatée
        }
      })
    )
    this.favoris = favorisAvecJeux
  },
  methods: {
    async retirerFavori (id) {
      await FavorisDataService.delete(id)
      this.favoris = this.favoris.filter(favori => favori.Id_favoris !== id)
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
