<template>
  <div class="container">
    <section class="eco-engagements">
      <h2>Soyez Verts ! Nos engagements éco-responsables</h2>
      <p>
        Chez EcoCook, nous pensons qu'une alimentation durable commence dès la recette. C'est pourquoi notre site est conçu pour :
      </p>
      <ul>
        <li>Réduire son impact environnemental 🌱</li>
        <li>Promouvoir la cuisine locale de saison 🍕</li>
        <li>Informer les utilisateurs avec transparence 🤝</li>
      </ul>
    </section>

    <section class="section">
      <h2>Catalogue de Saison</h2>
      <div class="seasons">
        <div class="season-card">
          <!--<img src="@/assets/img/hiver.jpg" alt="Hiver">-->
          <h3>Hiver</h3>
          <p>Recettes de saison pour l'hiver</p>
        </div>
        <div class="season-card">
          <!--<img src="@/assets/img/printemps.jpg" alt="Printemps">-->
          <h3>Printemps</h3>
          <p>Recettes fraîches de printemps</p>
        </div>
        <div class="season-card">
          <!--<img src="@/assets/img/ete.jpg" alt="Été">-->
          <h3>Été</h3>
          <p>Plats légers pour l'été</p>
        </div>
        <div class="season-card">
          <!--<img src="@/assets/img/automne.jpg" alt="Automne"> -->
          <h3>Automne</h3>
          <p>Saveurs chaudes de l'automne</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AccueilView'
}
</script>

<style scoped>
.container {
  padding: 40px;
}

.eco-engagements {
  margin-bottom: 40px;
  font-size: 1.3rem;
}

.eco-engagements ul {
  list-style-type: disc;
  margin-left: 20px;
}

.section h2 {
  margin-bottom: 20px;
}

.seasons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 1.3rem;
}

.season-card {
  background: #fff;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 300px;
}

.season-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
</style>
